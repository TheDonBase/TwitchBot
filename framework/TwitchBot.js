const tmi = require('tmi.js');
const glob = require('glob');
const path = require('path');
const shlex = require('shlex');
const Command = require('./core/Command');
const Logger = require('./logging/Logger')

class TwitchBot {
    #client = null;
    #debug = null;
    #commands = {};
    #token = null;
    #prefix = null;
    constructor(prefix, token) {
        this.#prefix = prefix;
        this.#token = token;
    }
    run(startup_settings = { commands: true }) {
        this.#debug = process.env.DEBUG;
        try {
            this.#client = new tmi.Client({
                options: { debug: true },
                connection: {
                    secure: true,
                    reconnect: true
                },
                identity: {
                    username: process.env.USERNAME,
                    password: this.#token
                },
                channels: [process.env.CHANNEL]
            });
            this.#client.connect();
        } catch (e) {
            console.error(e.message);
        }
        if (this.#debug) {
            this._on_connected();
        }
        this._on_message();
        this._generate_commands();
    }

    _generate_commands() {
        const commands = glob.sync('./commands/*/*.js').map(file => require(path.resolve(file)));
        let all_commands = {
            all: commands.map(c => {
                try {
                    const t = new c();
                    if (!(t instanceof Command)) {
                        return false;
                    }
                    t.client = this.#client;
                    return t;
                } catch (e) {
                    return false;
                }
            })
        };
        for (let command of all_commands.all) {
            all_commands[command.name] = command;
        }
        this.#commands = all_commands;
        Command.commands = all_commands;
        Logger("info", `Amount of commands: ${all_commands.length}`)
    }
    _on_connected() {
        this.#client.on('ready', () => {
            Logger("info", `Successfully logged in as ${this.#client.username}`);
        });
    }
    _on_message() {
        this.#client.on('message', async (channel, tags, message, self) => {
            if (self) return;
            const args = shlex.split(message.content.slice(this.#prefix.length).trim());
            const command = args.shift().toLowerCase();
            let found_command = null;
            for (let [name, c] of Object.entries(this.#commands)) {
                if (name === 'all') continue;
                if (c.name === command || (c.aliases !== undefined && c.aliases.includes(command))) {
                    found_command = c;
                    break;
                }
            }
            if (found_command === null) return false;
            Logger("info", `Received command [${command}] with params: ${JSON.stringify(args)}`);
            await found_command.execute(message, message.author, ...args);
        });
    }
}

module.exports = TwitchBot;
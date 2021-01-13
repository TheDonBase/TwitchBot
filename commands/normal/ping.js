const Command = require("../../framework/core/Command");

class Ping extends Command {
    constructor() {
        super();
        this.name = 'ping';
        this.description = "Displays the bots ping.";
    }

    async execute(message, channel, author, ...params) {
        this.client.say(channel, `@${author.username}, Yo what's up`);
    }
}

module.exports = Ping;
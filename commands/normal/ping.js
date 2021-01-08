const Command = require("../../framework/core/Command");

class Ping extends Command {
    constructor() {
        super();
        this.name = 'ping';
        this.description = "Displays the bots ping.";
    }

    async execute(message, channel, tags, ...params) {
        this.client.say(channel, `@${tags.username}, Yo what's up`);
    }
}

module.exports = Ping;
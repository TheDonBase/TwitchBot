const Command = require("../../framework/core/Command");

class clearChat extends Command {
    constructor() {
        super();
        this.name = 'clear';
        this.isModCmd = true;
        this.description = "Clears the chat.";
    }

    async execute(message, channel, author, ...params) {
        await this.client.clear(channel);
        await this.client.say(channel, 'Cleared the chat!');
    }
}

module.exports = clearChat;
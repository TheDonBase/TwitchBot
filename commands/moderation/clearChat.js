const Command = require("../../framework/core/Command");

class clearChat extends Command {
    constructor() {
        super();
        this.name = 'clear';
        this.isModCmd = true;
        this.description = "Clears the chat.";
    }

    async execute(message, user, channel, tags, ...params) {
        if (user.mod || user['user-type'] === 'mod') {
            await this.client.say('/clear');
        }
        else {
            return;
        }
    }
}

module.exports = clearChat;
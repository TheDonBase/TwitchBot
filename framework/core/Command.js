const TwitchBot = require("../TwitchBot");

class Command {
    constructor(...params) {
        this.isModCmd = false;
        this.client = TwitchBot.client;
        this.commands = null;
    }

    get is_debug() {
        return process.env.DEBUG;
    }

    execute(...params) {
        throw new DOMException('THE EXECUTE COMMAND SHOULD BE OVERRULED!!!');
    }
}

module.exports = Command;
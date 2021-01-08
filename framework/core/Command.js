class Command {
    constructor(...params) {
        this.isModCmd = false;
        this._client = null;
        this.commands = null;
    }
    get is_debug() {
        return process.env.DEBUG;
    }

    set client(client) {
        this._client = client;
    }


    execute(...params) {
        throw new DOMException('THE EXECUTE COMMAND SHOULD BE OVERRULED!!!');
    }
}

module.exports = Command;
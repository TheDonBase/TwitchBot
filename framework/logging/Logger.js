function Logger(messageType, message) {
    let timestamp = new Date().toUTCString()
    if (messageType === "info") {
        console.log(`[${timestamp} Info] ` + message);
    } else if (messageType === "error") {
        console.log(`[${timestamp} Error] ` + message);
    } else if (messageType === "debug") {
        console.log(`[${timestamp} Debug] ` + message);;
    }
}


module.exports = Logger;
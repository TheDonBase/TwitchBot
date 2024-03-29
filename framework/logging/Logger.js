const LOG_TYPES = {
    INFO: 0,
    ERROR: 1,
    DEBUG: 2
};

const LOG_TYPES_READABLE = {
    0: 'Info',
    1: 'Error',
    2: 'Debug'
};

function Logger({log_type=LOG_TYPES.INFO, message=new DOMException('Missing required message parameter in Logger method')} = {}) {
    let timestamp = new Date().toUTCString()
    console.log(`[${timestamp} ${LOG_TYPES_READABLE[log_type]}] ${message}`);
}


module.exports = {
    Logger,
    LOG_TYPES
};
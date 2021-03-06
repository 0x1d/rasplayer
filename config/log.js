/**
 * config file for logger
 * possible log levels: TRACE, DEBUG, INFO, ERROR, FATAL
 */
module.exports = {
    logLevel : "DEBUG", // overall log level
    appenders: [  // specific appender configuration NYI
        {type: "CONSOLE", logLevel: "TRACE"},
        {type: "FILE", logLevel: "INFO"}
    ]
};
module.exports = {
    port: process.env.VCAP_APP_PORT || process.env.PORT || 8080,
    serviceLocation: '/rasplayer/services',
    eventLocation: '/rasplayer/events',
    contentLocation: '/rasplayer/content',
    schemaLocation: '/rasplayer/schemas',
    db: require('./db'),
    log: require('./log')
};
const TwitchBot = require('./framework/TwitchBot');
require('dotenv').config();

const bot = new TwitchBot(process.env.PREFIX, process.env.TWITCH_OAUTH_TOKEN)

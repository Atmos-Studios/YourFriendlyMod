const djs = require('discord.js');

const colorUtil = require('./utils/colorUtil.js');
const color = colorUtil.color;
const reset = colorUtil.reset;
const decoration = colorUtil.decoration;

const commandLoader = require('./utils/commandLoader.js');
const eventLoader = require('./utils/eventLoader.js');

let client = new djs.Client();
client.commands = new djs.Collection();
client.aliases = new djs.Collection();
client.config = require('./config.json');

commandLoader.load(client.commands, client.aliases);
eventLoader.load(client);

client.login(client.config.token).catch(() => {
    setTimeout(() => {
        console.info(`${color.red + decoration.bright}ERROR: ${reset + color.red}Invalid token! Please check in config.json.${reset}`);
    }, 2000);
    client.destroy();
});

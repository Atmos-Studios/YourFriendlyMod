const fs = require('fs');

const colorUtil = require('./colorUtil.js');
const color = colorUtil.color;
const reset = colorUtil.reset;

module.exports.load = (client) => {
    fs.readdir('./events', (error, files) => {
        if (error) {
            console.error(error);
        }

        const eventFiles = files.filter((file) => {
            return file.split('.')[1] === 'js';
        });

        console.info(`Loading ${eventFiles.length} events${reset}`);

        eventFiles.forEach(async (event, i) => {
            const eventName = event.split('.')[0];
            const evt = require(`../events/${event}`);
            await client.on(eventName, evt.bind(null, client));
            console.info(`${i + 1}/${eventFiles.length} ${color.red}|${reset} Loaded ${color.yellow + eventName + reset} event`);
        });

        console.info(`Loaded all events${reset}`);
    });
};
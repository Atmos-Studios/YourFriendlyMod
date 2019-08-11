const fs = require('fs');

const colorUtil = require('./colorUtil.js');
const color = colorUtil.color;
const reset = colorUtil.reset;

module.exports.load = (commandCollection, aliasCollection) => {
    fs.readdir('./commands', (error, files) => {
        if (error) {
            console.error(error);
        }

        const commandFiles = files.filter((file) => {
            return file.split('.')[1] === 'js';
        });

        console.info(`Loading ${commandFiles.length} commands${reset}`);

        commandFiles.forEach((command, i) => {
            const cmd = require(`../commands/${command}`);
            commandCollection.set(cmd.help.name, cmd);
            cmd.help.aliases.forEach((alias) => {
                aliasCollection.set(alias, cmd);
            });
            console.info(`${i + 1}/${commandFiles.length} ${color.red}|${reset} Loaded ${color.yellow + command + reset} command`);
        });

        console.info(`Loaded all commands${reset}`);
    });
};
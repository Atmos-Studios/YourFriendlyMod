const config = require('../config.json')
const profanities = require('profanities')
module.exports = async (client, message) => {
    const command = message.content.split(' ')[0];
    const args = message.content.split(' ').slice(1);

    if (!command.startsWith(require('../config.json').prefix)) {
        return;
    }

    const cmd = client.commands.get(command.substring(1).toLowerCase());
    if (cmd) {
        cmd.run(client, message, args);
    }

    const alias = client.aliases.get(command.substring(1).toLowerCase());
    if (alias) {
        alias.run(client, message, args);
    }

    /*if(config.FILTER_LIST.some(word => message.content.toLowerCase().includes(word))){
        message.delete()
      }*/
};

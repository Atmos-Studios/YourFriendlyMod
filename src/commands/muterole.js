const edjf = require('edit-json-file');
const data = edjf('./data.json');

module.exports.run = async (client, message, args) => {
    let role;
    if (!message.mentions.roles.first()) {
        let id;

        if (args.length < 1) {
            id = message.author.id;
        } else {
            id = args[0];
        }

        role = message.guild.roles.get(id);
        if (!role) {
            message.channel.send('❌ Invalid role id');
        }
    } else {
        role = message.mentions.roles.array()[0];
    }

    message.channel.send(`Mute role set to ${role}`);
    data.set(`guilds.${message.guild.id}.muteRole`, role.id);
    data.save();
};

module.exports.help = {
    name: 'muterole',
    aliases: [],
    usage: 'muterole [@mention or id]',
    help: 'Sets the role that user is given when mute command is used'
};

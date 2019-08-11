
//TODO: cleanup command code

const edjf = require('edit-json-file');

module.exports.run = async (client, message, args) => {
    if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) {
        message.channel.send('❌ To use this command you need ``MANAGE_MESSAGES`` permission!');
        return;
    }

    let channel;

    if (args[0] === 'reset') {
        message.channel.send('Reset log channel!');
        const data = edjf('./data.json');
        data.set(`guilds.${message.guild.id}.logChannel`, undefined);
        data.save();
        return;
    }

    if (!message.mentions.channels.first()) {
        let id;

        if (args.length < 1) {
            id = message.channel.id;
        } else {
            id = args[0];
        }

        try {
            channel = await client.channels.get(id);
        } catch {
            message.channel.send('❌ Invalid channel id');
            return;
        }

        if (channel.type !== 'text') {
            message.channel.send('❌ Loggin channel must be a text channel!');
            return;
        }
    } else {
        channel = message.mentions.channels.array()[0];
    }
    const channelId = channel.id;

    const data = edjf('./data.json');
    data.set(`guilds.${message.guild.id}.logChannel`, channelId);
    data.save();

    message.channel.send(`Logging channel set to ${channel}`);
};

module.exports.help = {
    name: 'logchannel',
    aliases: [],
    usage: 'logchannel [optional: #mention or id]',
    help: 'Sets the logging channel.'
};

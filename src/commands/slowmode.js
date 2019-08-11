module.exports.run = async (client, message, args) => {
    if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_CHANNELS')) {
        message.channel.send('❌ To use this command you need ``MANAGE_CHANNELS`` permission!');
        return;
    }

    if (args.length < 1) {
        message.channel.send('Slowmode reset!');
        message.channel.setRateLimitPerUser(parseInt(0));
    } else {
        if (isNaN(args[0])) {
            message.channel.send(`❌ **${args[0]}** isn't a correct number!`);
            return;
        }

        message.channel.send(`Slowmode set to ${args[0]}`);
        try {
            message.channel.setRateLimitPerUser(parseInt(args[0]));
        } catch {
            message.channel.send('❌ I cannot edit this channel! Check if I have permissions to do so.');
        }
    }
};

module.exports.help = {
    name: 'slowmode',
    aliases: ['slowdown'],
    usage: 'slowmode [by default 0: time in seconds]',
    help: 'Sets slowmode on current channel.'
};

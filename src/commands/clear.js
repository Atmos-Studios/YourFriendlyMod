module.exports.run = async (client, message, args) => {
    if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) {
        message.channel.send('❌ To use this command you need ``MANAGE_MESSAGES`` permission!');
        return;
    }
    
    if (args.length < 1) {
        message.channel.send('❌ Provide number of messages to delete!');
        return;
    }

    if (isNaN(args[0])) {
        message.channel.send(`❌ **${args[0]}** isn't a vaild number!`);
        return;
    }

    message.channel.send('Fetching messages...');
    try {
        const deleted = await message.channel.bulkDelete(parseInt(args[0]) + 2);
        message.channel.send(`Deleted **${deleted.size - 2}** messages!`);
    } catch {
        message.channel.send("❌ Couldn't delete messages.");
        return;
    }
};

module.exports.help = {
    name: 'clear',
    aliases: ['prune', 'purge'],
    usage: 'purge [number of messages]',
    help: 'Bulk deletes given number of messages'
};

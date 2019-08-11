module.exports.run = async (client, message, args) => {
    if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_CHANNELS')) {
        message.channel.send('❌ To use this command you need ``MANAGE_CHANNELS`` permission!');
        return;
    }

    const everyone = message.guild.defaultRole;
    const everyonePermissions = message.channel.rolePermissions(everyone).serialize();

    try {
        message.channel.overwritePermissions(everyone, {
            SEND_MESSAGES: !everyonePermissions.SEND_MESSAGES
        });
        message.channel.send('``SEND_MESSAGES``' + ` permission set to **${!everyonePermissions.SEND_MESSAGES}**`);
    } catch {
        message.channel.send('❌ I cannot edit this channel! Check if I have permissions to do so.');
    }
};

module.exports.help = {
    name: 'lockchannel',
    aliases: ['lock', 'lockdown'],
    usage: 'lockchannel',
    help: 'Revokes/gives send messages permission to the everyone role on the current channel'
};

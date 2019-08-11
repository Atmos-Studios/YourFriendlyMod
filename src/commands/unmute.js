const djs = require('discord.js');
const edjf = require('edit-json-file');

module.exports.run = async (client, message, args) => {
    const data = edjf('./data.json');
    let user;
    if (!message.guild.members.get(message.author.id).hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send('❌ To use this command you need ``MANAGE_MESSAGES`` permission!');
    }
    if (!message.mentions.members.first()) {
        let id;

        if (args.length < 1) {
            message.channel.send('❌ Please provide a user!');
            return;
        } else {
            id = args[0];
        }

        user = await client.fetchUser(id).catch(() => {
            message.channel.send('❌ Invalid user id');
        });
    } else {
        user = message.mentions.users.array()[0];
    }
    const guildMember = message.guild.members.get(user.id);

    try {
        data.get().guilds[message.guild.id].muteRole;
    } catch {
        message.channel.send("❌ This server doesn't have a mute role set! See ``help muterole``.");
        return;
    }

    const muteRole = message.guild.roles.get(data.get().guilds[message.guild.id].muteRole);

    guildMember.removeRole(muteRole);

    message.channel.send(`${user} was unmuted!`);

    try {
        data.get().guilds[message.guild.id].logChannel;
    } catch {
        return;
    }

    const logChannel = client.channels.get(data.get().guilds[message.guild.id].logChannel);

    const member = message.guild.member(message.author);

    const embed = new djs.RichEmbed()
        .setAuthor(`${message.author.username} with user ${user.tag}`, message.author.displayAvatarURL)
        .setColor(member.colorRole.color)
        .setDescription(`**Action**: Unute`)
        .setTimestamp(new Date());

    logChannel.send(embed);
};

module.exports.help = {
    name: 'unmute',
    aliases: []
};
const edjf = require('edit-json-file');
const djs = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.guild.members.get(message.author.id).hasPermission('KICK_MEMBERS')) {
        message.channel.send('❌ To use this command you need ``KICK_MEMBERS`` permission!');
        return;
    }

    let user;
    if (!message.mentions.members.first()) {
        let id;

        if (args.length < 1) {
            id = message.author.id;
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
    if (!guildMember) {
        message.channel.send("❌ This person isn't a member of this guild!");
        return;
    }

    const data = edjf('./data.json');

    let warnings;
    try {
        warnings = data.get().guilds[message.guild.id].users[user.id].warnings;
    } catch {
        warnings = 0;
    }

    data.set(`guilds.${message.guild.id}.users.${user.id}.warnings`, warnings + 1);
    data.save();

    try {
        data.get().guilds[message.guild.id].logChannel;
    } catch {
        return;
    }

    const logChannel = client.channels.get(data.get().guilds[message.guild.id].logChannel);

    const member = message.guild.member(message.author);

    const embed = new djs.RichEmbed()
        .setAuthor(`${message.author.username} warned user ${user.tag}`, message.author.displayAvatarURL)
        .setColor(member.colorRole.color)
        .setDescription(`**Action**: Gave a warning`)
        .setTimestamp(new Date());

    logChannel.send(embed);

    message.channel.send(`${user} has been warned! Now (s)he has ${warnings + 1} warnings.`);
};

module.exports.help = {
    name: 'warn',
    aliases: ['warning'],
    usage: 'warn [@mention or id]',
    help: 'Gives a warning to the given user'
};

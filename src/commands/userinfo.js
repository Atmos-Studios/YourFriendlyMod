const RichEmbded = require('discord.js').RichEmbed;

module.exports.run = async (client, message, args) => {
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
    let embed = new RichEmbded()
        .setAuthor(user.username, user.avatarURL)
        .setThumbnail(user.avatarURL)
        .addField('Username:', user.tag, false)
        .addField('ID:', user.id, false)
        .addField('Created at:', user.createdAt.toDateString(), false);
    if (!guildMember) {
        embed.setColor([242, 0, 0]);
    } else {
        embed.setColor(message.guild.members.get(user.id).displayColor);
        embed.addField('Joined at:', new Date(message.guild.members.get(user.id).joinedTimestamp).toDateString(), false);
    }
    message.channel.send(embed);
};

module.exports.help = {
    name: 'userinfo',
    aliases: ['uinfo'],
    usage: 'userinfo [optional: @mention or id]',
    help: 'Informations about user'
};

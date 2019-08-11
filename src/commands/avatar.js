const djs = require('discord.js');

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
    let embed = new djs.RichEmbed().setTitle('User avatar').setImage(user.avatarURL);
    if (!guildMember) {
        embed.setColor([242, 0, 0]);
    } else {
        embed.setColor(guildMember.displayColor);
    }
    message.channel.send(embed);
};

module.exports.help = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    usage: 'avatar [optional: @mention or id]',
    help: 'Sends the avatar of the given user.'
};

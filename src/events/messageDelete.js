const edjf = require('edit-json-file');
const djs = require('discord.js');

module.exports = async (client, message) => {
    const data = edjf('./data.json');

    try {
        data.get().guilds[message.guild.id].logChannel;
    } catch {
        return;
    }

    const logChannel = client.channels.get(data.get().guilds[message.guild.id].logChannel);

    const member = message.guild.member(message.author);

    try {
        const embed = new djs.RichEmbed()
            .setAuthor(`${message.author.username} in channel #${message.channel.name}`, message.author.displayAvatarURL)
            .setColor(member.colorRole.color)
            .setDescription(`**Action**: Message Deleted\n**Deleted message:** ${message.content}`)
            .addField('User', `<@${message.author.id}>`)
            .setTimestamp(new Date());

        logChannel.send(embed);
    } catch {
        const embed = new djs.RichEmbed()
            .setAuthor(`${message.author.username} in channel #${message.channel.name}`, message.author.displayAvatarURL)
            .setColor([242, 0, 0])
            .setDescription(`**Action**: Message Deleted\n**Deleted message:** ${message.content}`)
            .addField('User', `<@${message.author.id}>`)
            .setTimestamp(new Date());

        logChannel.send(embed);
    }
};

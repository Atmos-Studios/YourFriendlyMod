const edjf = require('edit-json-file');
const djs = require('discord.js');

module.exports = async (client, messageOld, messageNew) => {
    if(messageOld.author === client.user){
        return;
    }

    const data = edjf('./data.json');

    try {
        data.get().guilds[messageOld.guild.id].logChannel;
    } catch {
        return;
    }

    const logChannel = client.channels.get(data.get().guilds[messageOld.guild.id].logChannel);

    const member = messageOld.guild.member(messageOld.author);

    const embed = new djs.RichEmbed()
        .setAuthor(`${messageOld.author.username} in channel #${messageOld.channel.name}`, messageOld.author.displayAvatarURL)
        .setColor(member.colorRole.color)
        .setDescription(`**Action**: Message Edited\n**Old message:** ${messageOld.content}\n**New message:** ${messageNew.content}`)
        .setTimestamp(new Date());

    logChannel.send(embed);
};
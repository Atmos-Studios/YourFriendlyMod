const edjf = require('edit-json-file');
const djs = require('discord.js');

module.exports = async (client, messages) => {
    const data = edjf('./data.json');

    const messagesIterable = messages.values();
    const messagesArray = Array.from(messagesIterable);

    let messagesIds = [];

    if (messagesArray.length > 10) {
        messagesIds = ['Too much messages to show!'];
    } else {
        messages.forEach((msg) => {
            messagesIds.push(msg.id);
        });
    }

    const guild = messagesArray[0].guild;

    try {
        data.get().guilds[guild.id].logChannel;
    } catch {
        return;
    }

    const logChannel = client.channels.get(data.get().guilds[guild.id].logChannel);

    const embed = new djs.RichEmbed()
        .setAuthor(`${messagesArray.length} messages in channel #${messagesArray[0].channel.name}`)
        .setColor([242, 0, 0])
        .setDescription(`**Action**: Messages Bulk Deleted\n**Deleted messages:** ` + '``' + messagesIds.join('``, ``') + '``')
        .setTimestamp(new Date());

    logChannel.send(embed);
};

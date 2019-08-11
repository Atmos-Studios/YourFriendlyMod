const djs = require('discord.js');

module.exports.run = async (client, message, args) => {
    const server = message.guild;

    const voiceChannels = [...server.channels.values()].filter((channel) => {
        return channel.type === 'voice' && channel.type !== 'category';
    });
    const textChannels = [...server.channels.values()].filter((channel) => {
        return channel.type === 'text' && channel.type !== 'category';
    });

    let region = server.region;

    const regions = {
        'eu-central': 'Central Europe',
        'eu-west': 'Western Europe',
        'hongkong': 'Hong Kong',
        'southafrica': 'South Africa',
        'us-central': 'US Central',
        'us-east': 'US East',
        'us-south': 'US South',
        'us-west': 'US West'
    };

    region = regions[region] === undefined ? region : regions[region];
    region = `${region.charAt(0).toUpperCase()}${region.substring(1)}`;

    let desc = '';

    desc += `**${server.memberCount}** members\n`;
    desc += `**Owner:** ${server.owner}\n`;
    desc += `**Created at:** ${server.createdAt.toDateString()}\n`;
    desc += `**Region:** ${region}\n**${textChannels.length}** text channels | **${voiceChannels.length}** voice channels`;

    const embed = new djs.RichEmbed()
        .setAuthor(server.name, server.iconURL)
        .setThumbnail(server.iconURL)
        .setColor([242, 0, 0])
        .setDescription(desc);
    message.channel.send(embed);
};

module.exports.help = {
    name: 'serverinfo',
    aliases: ['guildinfo'],
    usage: 'serverinfo',
    help: 'Shows info about the server'
};

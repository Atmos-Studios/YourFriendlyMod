const Discord = require('discord.js');
const msToTime = require('../utils/msToTime');

module.exports.run = async (client, message, args) => {
    let ms = client.uptime;
    let cd = 24 * 60 * 60 * 1000; // Calc days
    let ch = 60 * 60 * 1000; // Calc hours
    let cm = 60 * 1000; // Calc minutes
    let cs = 1000; // Calc seconds
    let days = Math.floor(ms / cd);
    let dms = days * cd; // Days, in ms
    let hours = Math.floor((ms - dms) / ch);
    let hms = hours * ch; // Hours, in ms
    let minutes = Math.floor((ms - dms - hms) / cm);
    let mms = minutes * cm; // Minutes, in ms
    let seconds = Math.round((ms - dms - hms - mms) / cs);
    if (seconds === 60) {
        minutes++; // Increase by 1
        seconds = 0;
    }
    if (minutes === 60) {
        hours++; // Inc by 1
        minutes = 0;
    }
    if (hours === 24) {
        days++; // Increase by 1
        hours = 0;
    }
    let dateStrings = [];

    if (days === 1) {
        dateStrings.push('**1** day');
    } else if (days > 1) {
        dateStrings.push('**' + String(days) + '** days');
    }

    if (hours === 1) {
        dateStrings.push('**1** hour');
    } else if (hours > 1) {
        dateStrings.push('**' + String(hours) + '** hours');
    }

    if (minutes === 1) {
        dateStrings.push('**1** minute');
    } else if (minutes > 1) {
        dateStrings.push('**' + String(minutes) + '** minutes');
    }

    if (seconds === 1) {
        dateStrings.push('**1** second');
    } else if (seconds > 1) {
        dateStrings.push('**' + String(seconds) + '** seconds');
    }

    let dateString = '';
    for (let i = 0; i < dateStrings.length - 1; i++) {
        dateString += dateStrings[i];
        dateString += ', ';
    }
    if (dateStrings.length >= 2) {
        dateString = dateString.slice(0, dateString.length - 2) + dateString.slice(dateString.length - 1);
        dateString += 'and ';
    }
    dateString += dateStrings[dateStrings.length - 1];
            let boticon = client.user.displayAvatarURL;
            let botembed = new Discord.RichEmbed()
                .setDescription('Bot information')
                .setThumbnail(boticon)
                .setTimestamp()
                .addField('Servers', `**${client.guilds.size}** servers`)
                .addField('Users:', `**${client.users.size}** users`)
                .addField('Uptime:', dateString)
                .addField('Cabin Crew Bot', 'By: **PIXELATED DEVELOPMENT**')
                .addField('Memory Consumption', `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`)
                .addField('Ping', `Bot Ping: **${client.ping} MS**`)
                .addField('Discord.js Version', `**^11.5.1**`)
                .addField('Node Version', `**${process.version}**`)
                .addField('Bot Development Server', '**https://discord.gg/mDJmQaA**')
                .addField('Bot Developer', '<@297190576267198465>')
                .addField('Bot Name', client.user.username)
                .addField('Bot Created', client.user.createdAt)                
                .setColor('RED');
};

module.exports.help = {
    name: 'botinfo',
    aliases: ['bot-info'],
    usage: 'botinfo',
    help: 'Shows info about the bot. Uptime, ping etc.'
};

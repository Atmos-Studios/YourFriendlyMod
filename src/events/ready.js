const colorUtil = require('../utils/colorUtil.js');
const color = colorUtil.color;
const reset = colorUtil.reset;

module.exports = (client) => {
    let statuses = [
        //`to ${bot.guilds.size} servers!`,
                "from PIXELATED DEVELOPMENT!",
                `to you!`,
                `to ${client.users.size} users!`,
                'from the United States!',
                'to this Discord Server!',
                `in Beta Mode!`,
                `to ${client.channels.size} channels!`,
                `to ${client.guilds.size} servers`
            ]
        
            setInterval(function() {
                let status = statuses[Math.floor(Math.random() * statuses.length)];
                client.user.setActivity(status, {type: "STREAMING", url: 'https://twitch.tv/yourdeadpixels'});
            }, 2500)
    console.info(`${color.red}Bot is ready!${reset}`);
};

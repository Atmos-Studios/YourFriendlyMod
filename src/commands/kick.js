
//TODO: rewrite command

const edjf = require('edit-json-file');
const djs = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.guild.members.get(message.author.id).hasPermission('KICK_MEMBERS')) {
        message.channel.send('❌ To use this command you need ``KICK_MEMBERS`` permission!');
    } else {
        let user;
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
        let reason = args.slice(1).join(' ');

        if(!reason || reason === ''){
            reason = 'No reason provided!'
        }

        if (guildMember && !guildMember.kickable) {
            message.channel.send('❌ I cannot kick this user');
            return;
        }

        guildMember.kick(reason).then(()=> {
            message.channel.send(`Kicked **${user.tag}** for **${reason}**!`);
        })

        const data = edjf('./data.json');

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
            .setDescription(`**Action**: Kick\n**Reason**: ${reason}`)
            .setTimestamp(new Date());

        logChannel.send(embed);
    }
};

module.exports.help = {
    name: 'kick',
    aliases: [],
    usage: 'kick [@mention or id] [optional: reason]',
    help: 'Kicks given member'
};

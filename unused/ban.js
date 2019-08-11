
//TODO: rewrite command

const edjf = require('edit-json-file');
const djs = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.guild.members.get(message.author.id).hasPermission('BAN_MEMBERS')) {
        message.channel.send('❌ To use this command you need ``BAN_MEMBERS`` permission!');
    } else {
        if (!message.mentions.members.first()) {
            if (args.length < 1) {
                message.channel.send('❌ You must provide a user. For more info see ``help unban``.');
            } else {
                try {
                    if (args.length >= 2) {
                        const reason = args.slice(1).join(' ');

                        if (message.guild.members.get(args[0]) && !message.guild.members.get(args[0]).bannable) {
                            message.channel.send('❌ I cannot ban this user');
                            return;
                        }
                        message.guild
                            .ban(args[0], {
                                reason: reason
                            })
                            .then((banned) => {
                                message.channel.send(`Banned **${banned.tag}** for **${reason}**!`);
                            })
                            .catch(() => {
                                message.channel.send('❌ Invalid user id');
                            });
                    } else {
                        if (message.guild.members.get(args[0]) && !message.guild.members.get(args[0]).bannable) {
                            message.channel.send('❌ I cannot ban this user');
                            return;
                        }
                        message.guild
                            .ban(args[0], {
                                reason: 'No reason provided'
                            })
                            .then((banned) => {
                                message.channel.send(`Banned **${banned.tag}** with no reason provided!`);
                            });
                    }
                } catch {
                    message.channel.send('❌ Invalid user id.');
                }
            }
        } else {
            const user = message.mentions.users.array()[0];
            const reason = args.slice(1).join(' ');

            if (!message.guild.members.get(user.id).bannable) {
                message.channel.send('❌ I cannot ban this user');
                return;
            }

            if (args.length >= 2) {
                message.guild
                    .ban(user, {
                        reason: reason
                    })
                    .then((banned) => {
                        message.channel.send(`Banned **${banned.tag}** for **${reason}**!`);
                    });
            } else {
                message.guild
                    .ban(user, {
                        reason: 'No reason provided'
                    })
                    .then((banned) => {
                        message.channel.send(`Banned **${banned.tag}** with no reason provided!`);
                    });
            }
        }
        const user = message.mentions.members.first() ? message.mentions.members.first() : await client.fetchUser(args[0]);
        let reason = args.slice(1).join(' ');

        if (reason === '' || !reason) {
            reason = 'No reason provided!';
        }

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
            .setDescription(`**Action**: Ban\n**Reason**: ${reason}`)
            .setTimestamp(new Date());

        logChannel.send(embed);
    }
    return;
};

module.exports.help = {
    name: 'ban',
    aliases: ['permban', 'pban', 'permaban'],
    usage: 'ban [@mention or id] [optional: reason]',
    help: 'Bans given member permanently'
};

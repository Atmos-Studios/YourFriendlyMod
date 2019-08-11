
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
                        try {
                            message.guild
                                .unban(args[0], {
                                    reason: reason
                                })
                                .then((unbanned) => {
                                    message.channel.send(`Unbanned **${unbanned.tag}** for **${reason}**!`);
                                })
                                .catch(() => {
                                    message.channel.send('❌ Invalid user id');
                                });
                        } catch {
                            message.channel.send('❌ I cannot unban this user');
                        }
                    } else {
                        try {
                            message.guild
                                .unban(args[0], {
                                    reason: 'No reason provided'
                                })
                                .then((unbanned) => {
                                    message.channel.send(`Unbanned **${unbanned.tag}** with no reason provided!`);
                                });
                        } catch {
                            message.channel.send('❌ I cannot unban this user');
                        }
                    }
                } catch (error) {
                    message.channel.send('❌ Invalid user id.');
                }
            }
        } else {
            const user = message.mentions.users.array()[0];
            const reason = args.slice(1).join(' ');

            try {
                if (args.length >= 2) {
                    message.guild
                        .unban(user, {
                            reason: reason
                        })
                        .then((unbanned) => {
                            message.channel.send(`Unanned **${unbanned.tag}** for **${reason}**!`);
                        });
                } else {
                    message.guild
                        .unban(user, {
                            reason: 'No reason provided'
                        })
                        .then((unbanned) => {
                            message.channel.send(`Unbanned **${unbanned.tag}** with no reason provided!`);
                        });
                }
            } catch {
                message.channel.send('❌ I cannot unban this user');
            }
        }
        const user = message.mentions.members.first() ? message.mentions.members.first() : await client.fetchUser(args[0]);
        let reason = args.slice(1).join(' ');

        if(reason === '' || !reason){
            reason = 'No reason provided!'
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
            .setDescription(`**Action**: Unban\n**Reason**: ${reason}`)
            .setTimestamp(new Date());

        logChannel.send(embed);
    }
    return;
};

module.exports.help = {
    name: 'unban',
    aliases: ['uban', 'revokeban'],
    usage: 'unban [@mention or id]',
    help: 'Unbans given member'
};

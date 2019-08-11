
//TODO: rewrite command

const edjf = require('edit-json-file');
const djs = require('discord.js');

module.exports.run = async (client, message, args) => {
    let userGlobal;
    if (!message.guild.members.get(message.author.id).hasPermission('BAN_MEMBERS')) {
        message.channel.send('❌ To use this command you need ``BAN_MEMBERS`` permission!');
    } else {
        if (!message.mentions.members.first()) {
            if (args.length < 1) {
                message.channel.send('❌ You must provide a user. For more info see ``help ban``.');
            } else {
                try {
                    if (message.guild.members.get(args[0]) && !message.guild.members.get(args[0]).bannable) {
                        message.channel.send('❌ I cannot ban this user');
                        return;
                    }
                    message.guild
                        .ban(args[0], {
                            reason: 'softban',
                            days: 7
                        })
                        .then(() => {
                            message.guild
                                .unban(args[0], {
                                    reason: 'softban'
                                })
                                .then((unbanned) => {
                                    message.channel.send(`Softbanned **${unbanned.tag}**!`);
                                    const data = edjf('./data.json');

                                    try {
                                        data.get().guilds[message.guild.id].logChannel;
                                    } catch {
                                        return;
                                    }

                                    const logChannel = client.channels.get(data.get().guilds[message.guild.id].logChannel);

                                    const member = message.guild.member(message.author);

                                    const embed = new djs.RichEmbed()
                                        .setAuthor(`${message.author.username} with user ${unbanned.tag}`, message.author.displayAvatarURL)
                                        .setColor(member.colorRole.color)
                                        .setDescription(`**Action**: Softban`)
                                        .setTimestamp(new Date());

                                    logChannel.send(embed);
                                });
                        });
                } catch {
                    message.channel.send('❌ Invalid user id.');
                }
            }
        } else {
            const user = message.mentions.users.array()[0];

            if (!message.guild.members.get(user.id).bannable) {
                message.channel.send('❌ I cannot ban this user');
                return;
            }

            message.guild
                .ban(user, {
                    reason: 'softban',
                    days: 7
                })
                .then(() => {
                    message.guild
                        .unban(user, {
                            reason: 'softban'
                        })
                        .then((unbanned) => {
                            message.channel.send(`Softbanned **${unbanned.tag}**!`);
                            const data = edjf('./data.json');

                            try {
                                data.get().guilds[message.guild.id].logChannel;
                            } catch {
                                return;
                            }

                            const logChannel = client.channels.get(data.get().guilds[message.guild.id].logChannel);

                            const member = message.guild.member(message.author);

                            const embed = new djs.RichEmbed()
                                .setAuthor(`${message.author.username} with user ${unbanned.tag}`, message.author.displayAvatarURL)
                                .setColor(member.colorRole.color)
                                .setDescription(`**Action**: Softban`)
                                .setTimestamp(new Date());

                            logChannel.send(embed);
                        });
                });
        }
    }
    return;
};

module.exports.help = {
    name: 'softban',
    aliases: ['sban'],
    usage: 'softban [@mention or id]',
    help: 'Sofbans given member, that means his banned and instantly unbanned (this is done for deleting users messages)'
};

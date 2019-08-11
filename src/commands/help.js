const djs = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (args.length >= 1) {
        if (!client.commands.get(args[0].toLowerCase())) {
            if (!client.aliases.get(args[0].toLowerCase())) {
                if (args[0] !== 'time') {
                    message.channel.send("❌ I don't know a command called ``" + args[0] + '``! Use ``help`` to see list of available commands.');
                } else {
                    const embed = new djs.RichEmbed().setTitle('How the bot parses time').setDescription('To represent time use: ``[number] [units]``\nExample: ``1 week 2 days 2h 30 sec`` stands for 1 week 2 days 2 hours and 30 seconds\nAvailable units:\n- years (also ``year``, ``yrs``, ``yr``, ``y``)\n- months (also ``month``, ``mth``, ``mt``)\n- weeks (also ``week``, ``wks``, ``wk``, ``w``)\n- days (also ``day``, ``d``)\n- hours (also ``hour``, ``hrs``, ``hr``, ``h``)\n- minutes (also ``minute``, ``mins``, ``min``, ``m``)\n- seconds (also ``seconds``, ``secs``, ``sec``, ``s``)');
                    message.channel.send(embed);
                }
            } else {
                const command = client.aliases.get(args[0].toLowerCase());
                if (command.help.aliases.length > 0) {
                    const embed = new djs.RichEmbed()
                        .setTitle(`Command info: ${command.help.name}`)
                        .setDescription('Aliases: ``' + command.help.aliases.join('``, ``') + '``\nUsage: ``' + command.help.usage + '``\nDescription: ' + command.help.help)
                        .setColor(message.guild.members.get(message.author.id).displayColor);
                    message.channel.send(embed);
                } else {
                    const embed = new djs.RichEmbed()
                        .setTitle(`Command info: ${command.help.name}`)
                        .setDescription('Usage: ``' + command.help.usage + '``\nDescription: ' + command.help.help)
                        .setColor(message.guild.members.get(message.author.id).displayColor);
                    message.channel.send(embed);
                }
            }
        } else {
            const command = client.commands.get(args[0].toLowerCase());
            if (command.help.aliases.length > 0) {
                const embed = new djs.RichEmbed()
                    .setTitle(`Command info: ${command.help.name}`)
                    .setDescription('Aliases: ``' + command.help.aliases.join('``, ``') + '``\nUsage: ``' + command.help.usage + '``\nDescription: ' + command.help.help)
                    .setColor(message.guild.members.get(message.author.id).displayColor);
                message.channel.send(embed);
            } else {
                const embed = new djs.RichEmbed()
                    .setTitle(`Command info: ${command.help.name}`)
                    .setDescription('Usage: ``' + command.help.usage + '``\nDescription: ' + command.help.help)
                    .setColor(message.guild.members.get(message.author.id).displayColor);
                message.channel.send(embed);
            }
        }
    } else {
        const embed = new djs.RichEmbed()
            .setTitle('List of all available commands')
            .setDescription('``' + Array.from(client.commands.keys()).join('``, ``') + '``')
            .setColor(message.guild.members.get(message.author.id).displayColor);
        message.channel.send(embed);
    }
};

module.exports.help = {
    name: 'help',
    aliases: [],
    usage: 'help [optional: command or alias]',
    help: 'Shows all comands or a command usage, aliases and description'
};

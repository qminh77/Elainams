module.exports = {
    name: "filter",
    cooldown: 3,
    description: 'songs filters',
    aliases: ["f"],
    run: async function(client, message, args, user) {
        try {
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Cậu phải ở trong một kênh thoại để sử dụng lệnh này:3`,
                        color: 0xF70000
                    }
                });
                return
            }
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Elaina cần các quyền tương tự để phát nhạc như \`CONNECT\`, \`SPEAK\``,
                        color: 0xF70000
                    }
                });
                return
            }
            if (!args.length) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Vui lòng nhập tên Filter sau lệnh <3d/bassboost/echo/karaoke/nightcore/vaporwave>`,
                        color: 0xF70000
                    }
                });
                return
            }
            let queue = distube.getQueue(message);
            if (!queue) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Hàng đợi máy chủ trống, vui lòng phát nhạc trước`,
                        color: 0xF70000
                    }
                });
                return
            }
            distube.setFilter(message, args[0]);
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`🎭 | Filters`, client.user.avatarURL({ dynamic: true }), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=6479507312`)
                .setColor('GREEN')
                .setDescription(`🎭 | Filter hàng đợi đã được thay đổi thành \`${args[0]}\``)
                .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
            )
        } catch (err) {
            console.log(err)
        }
    }
};
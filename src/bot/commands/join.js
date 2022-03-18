module.exports = {
    name: "join",
    cooldown: 3,
    description: 'join the channel 24/7',
    aliases: [],
    run: async function(client, message, args, user) {
        try {
            const distube = client.distube;
            const { MessageEmbed } = require('discord.js');
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `Cậu cần phải trong kênh thoại mới sử dụng được:<`,
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
                        description: `Tớ cần các quyền tương tự để phát nhạc như \`CONNECT\`, \`SPEAK\``,
                        color: 0xF70000
                    }
                });
                return
            }
            voiceChannel.join();
            message.channel.send(
                new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`🗃️ | Elaina đã tham gia <#${voiceChannel.id}>`)
            )
        } catch (err) {
            console.log(err)
        }
    }
};
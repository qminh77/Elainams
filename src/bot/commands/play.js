module.exports = {
    name: "play",
    cooldown: 3,
    description: 'play a music/playlist',
    aliases: ["p"],

    run: async function(client, message, args, user) {
        try {
            const distube = client.distube;
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `you have to be in a voice channel to use this command`,
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
                        description: `the bot need's same permissions to play a music like \`CONNECT\`, \`SPEAK\``,
                        color: 0xF70000
                    }
                });
                return
            }
            if (!args.length) {
                message.channel.send({
                    embed: {
                        title: `❌ | Error`,
                        description: `you have to type the song <name/url> after the command`,
                        color: 0xF70000
                    }
                });
                return
            }
            distube.play(message, args.join(" "));
        } catch (err) {
            console.log(err)
        }
    }
}

//-------------
const player = async function(guild, song, client, message) {
    const songQueue = client.queue.get(guild.id);
    if (!song) {
        songQueue.queueConstructor.leave();
        queue.delete(guild.id);
        return
    }
    try {
        const stream = require('ytdl-core')(song.url, { filter: 'audioonly' });
        songQueue.connection.play(stream, { seek: 0, volume: 0.5 }).on('finish', function() {
            const loop = require('quick.db').fetch(`Loop_${guild.id}`);
            if (loop == 'on') {
                let lastSong = songQueue.songs.shift();
                songQueue.songs.push(lastSong);
                player(guild, songQueue.songs[0]);
            }
            songQueue.songs.shift();
            player(guild, songQueue.songs[0]);
        });
    } catch (err) {
        throw err;
    }
    var likes = song.likes;
    var { MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
    if (likes) {
        embed.setAuthor(song.title, song.thumbnail || client.user.avatarURL({ dynamic: true }), song.url)
            .setColor('GREEN')
            .setThumbnail(song.thumbnail || client.user.avatarURL({ dynamic: true }))
            .setDescription(`✅ | **__[${song.title}](${song.url})__** is playing now`)
            .setFooter(likes)
    } else {
        embed.setAuthor(song.title, song.thumbnail, song.url)
            .setColor('GREEN')
            .setThumbnail(song.thumbnail)
            .setDescription(`✅ | **__[${song.title}](${song.url})__** is playing now`)
            .setFooter(song.duration)
    }
    await message.channel.send({ embed: embed })
}
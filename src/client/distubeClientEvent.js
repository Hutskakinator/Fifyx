const { DisTube } = require("distube");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { EmbedBuilder } = require('discord.js');

function distubeClient(client) {
    // Initialize DisTube with plugins
    client.distube = new DisTube(client, {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        plugins: [
            new SpotifyPlugin({ emitEventsAfterFetching: true }),
            new SoundCloudPlugin(),
            new YtDlpPlugin()
        ]
    });

    const getStatus = (queue) => {
        return `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
    };

    const sendEmbed = (channel, description) => {
        channel.send({
            embeds: [new EmbedBuilder().setColor(client.config.embedMusic).setDescription(description)]
        });
    };

    client.distube
        .on('playSong', (queue, song) => {
            sendEmbed(queue.textChannel, `🎶 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${getStatus(queue)}`);
        })
        .on('addSong', (queue, song) => {
            sendEmbed(queue.textChannel, `🎶 | Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`);
        })
        .on('addList', (queue, playlist) => {
            sendEmbed(queue.textChannel, `🎶 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${getStatus(queue)}`);
        })
        .on('error', (channel, e) => {
            if (channel) {
                sendEmbed(channel, `⛔ | An error encountered: ${e.toString().slice(0, 1974)}`);
            } else {
                console.error(e);
            }
        })
        .on('empty', (channel) => {
            sendEmbed(channel, '⛔ | Voice channel is empty! Leaving the channel...');
        })
        .on('searchNoResult', (message, query) => {
            sendEmbed(message.channel, `⛔ | No result found for \`${query}\`!`);
        })
        .on('finish', (queue) => {
            sendEmbed(queue.textChannel, '🏁 | Queue finished!');
        });
}

module.exports = distubeClient;
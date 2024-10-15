const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('soundboard')
        .setDescription('Play a sound effect in your voice channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.UseSoundboard)
        .addStringOption(option => option.setName('sound').setDescription('Your choice').setRequired(true)
            .addChoices(
                { name: 'Bruh', value: 'bruh' },
                { name: 'Aw Shit', value: 'awShit' },
                { name: 'Sad Violin', value: 'sadViolin' },
                { name: 'Frog Sound', value: 'frog' },
                { name: 'Air Horn', value: 'airHorn' },
                { name: 'Funny Laugh', value: 'funnyLaugh' },
                { name: 'Vine Boom', value: 'vineBoom' },
                { name: 'Sad Trombone', value: 'sadTrombone' },
                { name: 'Do It Again', value: 'doItAgain' },
                { name: 'Yay', value: 'yay' }
            )
        ),
    async execute(interaction, client) {
        const sound = interaction.options.getString('sound');

        if (!interaction.member.permissions.has(PermissionFlagsBits.UseSoundboard)) {
            return await interaction.reply({ content: `${client.config.noPerms}`, ephemeral: true });
        }

        let audioURL;

        switch (sound) {
            case 'bruh':
                audioURL = 'https://www.myinstants.com/media/sounds/movie_1_C2K5NH0.mp3';
                break;
            case 'awShit':
                audioURL = 'https://www.myinstants.com/media/sounds/gta-san-andreas-ah-shit-here-we-go-again.mp3';
                break;
            case 'sadViolin':
                audioURL = 'https://www.myinstants.com/media/sounds/sad-violin-1.mp3';
                break;
            case 'frog':
                audioURL = 'https://www.myinstants.com/media/sounds/frog-sound.mp3';
                break;
            case 'airHorn':
                audioURL = 'https://www.myinstants.com/media/sounds/airhorn-1.mp3';
                break;
            case 'funnyLaugh':
                audioURL = 'https://www.myinstants.com/media/sounds/laughing-sound-effect.mp3';
                break;
            case 'vineBoom':
                audioURL = 'https://www.myinstants.com/media/sounds/vine-boom.mp3';
                break;
            case 'sadTrombone':
                audioURL = 'https://www.myinstants.com/media/sounds/sad-trombone-1.mp3';
                break;
            case 'doItAgain':
                audioURL = 'https://www.myinstants.com/media/sounds/do-it-again.mp3';
                break;
            case 'yay':
                audioURL = 'https://www.myinstants.com/media/sounds/yay.mp3';
                break;
        }

        if (!interaction.member.voice.channel) {
            await interaction.reply({ content: 'You must be in a **voice channel** to use this command.', ephemeral: true });
            return;
        }

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const audioPlayer = createAudioPlayer();
        connection.subscribe(audioPlayer);
        const audioResource = createAudioResource(audioURL);
        audioPlayer.play(audioResource);

        const embedPlay = new EmbedBuilder()
            .setColor(client.config.embedMusic)
            .setAuthor({ name: `Soundboard Command ${client.config.devBy}` })
            .setTitle(`${client.user.username} Soundboard Command ${client.config.arrowEmoji}`)
            .setDescription(`> ${client.config.musicEmojiPlay} Playing your **sound effect**..`)
            .setFooter({ text: `Soundboard Command` })
            .setTimestamp()
            .setThumbnail(client.user.avatarURL());

        const message = await interaction.reply({ embeds: [embedPlay], fetchReply: true, ephemeral: true });

        audioPlayer.on('stateChange', (oldState, newState) => {
            if (newState.status === 'idle') {
                connection.destroy();

                const embedStop = new EmbedBuilder()
                    .setColor(client.config.embedMusic)
                    .setAuthor({ name: `Soundboard Command ${client.config.devBy}` })
                    .setTitle(`${client.user.username} Soundboard Command ${client.config.arrowEmoji}`)
                    .setDescription(`> ${client.config.musicEmojiPlay} Your **sound effect** finished playing`)
                    .setFooter({ text: `Soundboard Command` })
                    .setTimestamp()
                    .setThumbnail(client.user.avatarURL());

                interaction.editReply({ embeds: [embedStop], ephemeral: true });
            }
        });

        audioPlayer.on('error', error => {
            client.logs.error(error);
            connection.destroy();

            message.edit({ content: `An **error** occurred whilst playing your **sound effect**!` });
        });
    },
};
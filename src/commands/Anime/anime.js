const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Anime related commands")
    .addSubcommand(subcommand =>
      subcommand
        .setName("waifu")
        .setDescription("Replies with a waifu!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("neko")
        .setDescription("Replies with a neko!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("shinobu")
        .setDescription("Replies with Shinobu!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("megumin")
        .setDescription("Replies with Megumin!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("cuddle")
        .setDescription("Replies with a cuddle!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("hug")
        .setDescription("Replies with a hug!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("kiss")
        .setDescription("Replies with a kiss!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("lick")
        .setDescription("Replies with a lick!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("pat")
        .setDescription("Replies with a pat!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("smug")
        .setDescription("Replies with a smug character!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("blush")
        .setDescription("Replies with a blushing character!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("smile")
        .setDescription("Replies with a smiling character!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("wave")
        .setDescription("Replies with a wave!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("highfive")
        .setDescription("Replies with a high five!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("handhold")
        .setDescription("Replies with a handhold!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("nom")
        .setDescription("Replies with a nom!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("bite")
        .setDescription("Replies with a bite!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("glomp")
        .setDescription("Replies with a glomp!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("happy")
        .setDescription("Replies with a happy character!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("wink")
        .setDescription("Replies with a wink!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("poke")
        .setDescription("Replies with a poke!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("dance")
        .setDescription("Replies with a dance!")
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("cringe")
        .setDescription("Replies with something cringe!")
    ),
  async execute(interaction) {
    const type = interaction.options.getSubcommand();
    const waifuFetch = await fetch(`https://api.waifu.pics/sfw/${type}`, {
      headers: { Accept: "application/json" },
    });

    if (!waifuFetch.ok) {
      return interaction.reply(`API request failed with status **${waifuFetch.status}**.`);
    }

    const waifuData = await waifuFetch.json();
    const waifuEmbed = new EmbedBuilder()
      .setImage(waifuData.url)
      .setColor("Red")
      .setTimestamp();

    await interaction.reply({
      content: `**❤️ ${type.charAt(0).toUpperCase() + type.slice(1)}:**`,
      embeds: [waifuEmbed],
    });
  },
};

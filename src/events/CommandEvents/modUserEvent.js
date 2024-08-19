module.exports = (client) => {
    const rulesCache = new Map();
    const lastFetchCache = new Map();
    const ASCIIRegex = /^[\x20-\x7E]+$/;

    async function GetAutomodRules(guildId) {
        const lastFetch = lastFetchCache.get(guildId) || 0;

        if (Date.now() - lastFetch < 1000 * 60 * 30 && rulesCache.has(guildId)) {
            return rulesCache.get(guildId);
        }
        const guild = client.guilds.cache.get(guildId);
        if (!guild) return [];

        try {
            const automodRules = await guild.autoModerationRules.fetch(); // Fetch all AutoMod rules for the guild
            const rules = automodRules.map(rule =>
                rule.triggerMetadata.keywordFilter.map(keyword =>
                    new RegExp(keyword.replace('*', '.*'), 'i')
                )
            ).flat();

            rulesCache.set(guildId, rules);
            lastFetchCache.set(guildId, Date.now());
            return rules;
        } catch (error) {
            console.error(`Failed to fetch AutoMod rules for guild ${guildId}:`, error);
            return [];
        }
    }

    client.on('guildMemberUpdate', async (oldMember, newMember) => {
        const oldName = oldMember.nickname ?? oldMember.displayName;
        const newName = newMember.nickname ?? newMember.displayName;
        if (oldName === newName) return;

        const isPingable = ASCIIRegex.test(newName);
        const isHoisted = newName.startsWith('!');
        const isEveryone = newName.includes('@everyone') || newName.includes('@here');
        const isInvite = ['dsc.gg/', 'discord.gg/', 'discord.com/invite/', 'discordapp.com/invite/'].some(link => newName.includes(link));

        if (isPingable && !(isHoisted || isEveryone || isInvite)) return;

        if (isHoisted && isPingable && !isEveryone && !isInvite) {
            const cleanName = newName.replace(/^!+/, '');
            if (cleanName.length > 1) {
                try {
                    await newMember.setNickname(cleanName);
                    return;
                } catch (error) {
                    console.error(`Failed to set nickname for ${newMember.id} in guild ${newMember.guild.id}:`, error);
                }
            }
        }

        const rules = await GetAutomodRules(newMember.guild.id);
        if (!rules.length) return;

        const isBlocked = rules.some(rule => rule.test(newMember.user.username));
        const username = isBlocked ? `ModName ${Math.floor(Math.random() * 9000) + 1000}` : newMember.user.username;

        try {
            await newMember.setNickname(username);
        } catch (error) {
            console.error(`Failed to set nickname for ${newMember.id} in guild ${newMember.guild.id}:`, error);
        }
    });
};

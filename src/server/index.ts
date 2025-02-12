import { config } from '@/util/config'

on('playerConnecting', async (name: string, _setKickReason: any, deferrals: any) => {
    deferrals.defer();

    const regex = new RegExp(config.regexPattern);
    const src = source;

    try {
        deferrals.update(`Hello ${name}. Your PlayerName format is being checked.`);

        if (config.enforceDiscordNameSync) {
            const discordName = await exports.Badger_Discord_API.GetDiscordNickname(src);
            if (!discordName) {
                deferrals.done("Could not fetch your Discord name. Please ensure Discord is open.");
                return;
            }

            if (name !== discordName) {
                deferrals.done(config.notMatchDiscord);
            }
        }

        if (regex.test(name)) {
            deferrals.done();
        } else {
            deferrals.done(config.invalidMessage);
        }
    } catch (error) {
        console.error(`^1[ERROR]^0 Unexpected error during player connection: ${error.message}`);
        deferrals.done("An unexpected error occurred. Please try again later.");
    }
})

exports['FS-Lib'].VersionCheck('FS-NameSync', 'fearlessnite345/FS-NameSync')
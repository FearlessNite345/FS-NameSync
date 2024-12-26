const { regexPattern, invalidMessage, notMatchDiscord, phoneNumberFormat } = require('./config.json');

on('playerConnecting', async (name, setKickReason, deferrals) => {
    deferrals.defer();

    const regex = new RegExp(regexPattern);
    const src = source;

    try {
        const discordName = await exports.Badger_Discord_API.GetDiscordNickname(src);
        if (!discordName) {
            deferrals.done("Could not fetch your Discord name. Please ensure Discord is linked.");
            return;
        }

        deferrals.update(`Hello ${name}. Your PlayerName format is being checked.`);

        if (regex.test(name)) {
            const numberMatch = name.match(/^\d+/);
            if (!numberMatch) {
                deferrals.done("Your name must start with a number.");
                return;
            }

            const number = numberMatch[0];
            const paddedNumber = number.padStart(4, '0');
            const license = GetPlayerIdentifierByType(src, 'license');

            if (!license) {
                console.error(`^1[ERROR]^0 No license found for source: ${src}`);
                deferrals.done("Failed to fetch your license. Please rejoin.");
                return;
            }

            // Use the format from the config to create the phone number
            const phoneNumber = phoneNumberFormat.replace("{number}", paddedNumber);

            try {
                await exports.oxmysql.insert('INSERT IGNORE INTO phone_phones (id, owner_id, phone_number) VALUES (?, ?, ?)', [
                    license, license, phoneNumber
                ]);
                deferrals.done();
            } catch (error) {
                console.error(`^1[ERROR]^0 Database error: ${error.message}`);
                deferrals.done("Failed to register your phone number. Please contact support.");
            }
        } else if (name !== discordName) {
            deferrals.done(notMatchDiscord);
        } else {
            deferrals.done(invalidMessage);
        }
    } catch (error) {
        console.error(`^1[ERROR]^0 Unexpected error during player connection: ${error.message}`);
        deferrals.done("An unexpected error occurred. Please try again later.");
    }
});

import { regexPattern, invalidMessage } from './config.json';

on('playerConnecting', (input) => {
    deferrals.defer()

    const regex = new RegExp(regexPattern);

    deferrals.update('Your PlayerName format is being check.')
    
    if (regex.test(input)) {
        deferrals.done()
    } else {
        deferrals.done(invalidMessage)
    }
});
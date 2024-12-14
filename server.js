const { regexPattern, invalidMessage } = require('./config.json');

on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.defer()

    const regex = new RegExp(regexPattern);

    deferrals.update(`Hello ${name}. Your PlayerName format is being check.`)
    
    setTimeout(() => {
        if (regex.test(name)) {
            deferrals.done()
        } else {
            deferrals.done(invalidMessage)
        }
    }, 2)
});
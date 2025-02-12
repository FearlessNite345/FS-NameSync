const config = JSON.parse(LoadResourceFile(GetCurrentResourceName(), "config.json")) as Config;
// If you choose to remove the interface below, make sure to remove the "as Config" part from the line above.

// This is optional, but it's helpful to provide type completion for your config options.
export interface Config {
	regexPattern: string,
	invalidMessage: string,
	notMatchDiscord: string,
	enforceDiscordNameSync: boolean
}

// Export so it can be accessed from any other file.
export { config };

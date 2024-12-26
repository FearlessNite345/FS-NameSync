# FS-NameSync

**FS-NameSync** is a FiveM script designed to enforce strict player name formatting while dynamically integrating the first numeric value into the player's LB phone number. This script ensures consistent player identification and enhances in-game functionality by linking name data to phone numbers.

## Features
- Validates player name format using a customizable regular expression.
- Ensures player names start with a numeric value.
- Dynamically generates and assigns LB phone numbers based on player names.
- Fully configurable via `config.json`.

---

## Installation

1. **Download and Extract**
   - Download the `FS-NameSync` resource.
   - Extract it into your FiveM server's `resources` folder.

2. **Configure the Resource**
   - Open the `config.json` file in the resource folder.
   - Customize the configuration settings as needed.

   Example `config.json`:
   ```json
   {
       "regexPattern": "^\\d{4}_.*",  
       "invalidMessage": "Invalid name format. Please follow the guidelines.",
       "notMatchDiscord": "Your name does not match your Discord nickname.",
       "phoneNumberFormat": "221555{number}"
   }
   ```

3. **Add to Server.cfg**
   - Open your `server.cfg` file.
   - Add the following line:
     ```
     ensure FS-NameSync
     ```

4. **Restart the Server**
   - Restart your FiveM server to apply the changes.

---

## Configuration Details

### `regexPattern`
A regular expression used to validate the player name format. 
- Example: `"^\\d{4}_.*"` ensures names start with 4 digits followed by an underscore and other characters.

### `invalidMessage`
The message displayed to players if their name does not match the required format.

### `notMatchDiscord`
The message displayed if the player’s name does not match their Discord nickname.

### `phoneNumberFormat`
Defines the format for the generated phone number. Use `{number}` as a placeholder for the padded numeric value from the player’s name.
- Example: `"221555{number}"` will create a phone number like `2215551234` if the player’s name starts with `1234`.

---

## Usage

When a player connects to the server, the script will:
1. Check if their name matches the `regexPattern`.
2. Extract the numeric portion of the name and pad it to 4 digits if necessary.
3. Generate a phone number using the `phoneNumberFormat`.
4. Store the generated phone number in the database.
5. Notify the player if their name does not meet the required format or does not match their Discord nickname.

---

## Troubleshooting

1. **Name Validation Fails**:
   - Ensure the `regexPattern` in `config.json` matches the desired name format.
   - Example: If names should start with 4 digits and an underscore, use `"^\\d{4}_.*"`.

2. **Phone Number Not Generated**:
   - Verify the `phoneNumberFormat` includes `{number}` as a placeholder.

3. **Database Errors**:
   - Ensure your database is set up correctly and `oxmysql` is installed and configured.
   - Check server console logs for any SQL errors.

---

## Dependencies

- **oxmysql**: Required for database interactions.
- **Badger_Discord_API**: Used for fetching the player’s Discord nickname.

---

## Support
If you encounter any issues or have questions, feel free to contact the server admin or refer to the logs for detailed error messages.

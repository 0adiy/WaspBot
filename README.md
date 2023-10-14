# Waspbot
An all purpose bot in devlopment
Supports a lot of music commands with intuitive commands and buttons

---
## Invite
Discord invite link for the bot:


---
## Features
### Music Support
The bot has currently these commands for music:

- play
- queue
- pause
- resume
- nowplaying
- disconnect
- forward
- skip
- loop
- volume

## Customize build
### Prerequisites
- **Node.js >= 16**
 > You can download it from https://nodejs.org/en/download
- **npm**
 > npm is a package manager that should be installed with nodejs automatically

If you want to customize the build of the bot, you can do it by following the steps:
1. Clone the repo
    ```cmd
    git clone https://github.com/rafaelwasp/waspbot.git
    ```
2. An example config file is included as `config.example.js`, change filename to `config.js` and enter neccessary details
    - You will need to visit discord developer portal and create a new application
    - Copy the Client ID and Token from the application
    - Enter the Client ID and Token in the config file
    - Enter other neccessary details and save the file
    - You will also need a MongoDB Connection string for the bot to connect to, enter it in the config file
3. Make the changes in package.json if needed and run npm install
    ```cmd
    cd waspbot
    npm install
    ```
4. Run npm start (or `npm run dev` if you want to run the bot in development mode ie, using nodemon)
    ```cmd
    npm start
    ```
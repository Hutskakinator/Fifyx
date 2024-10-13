# Fifyx Discord Bot

<p align="center">
  <img src="https://img.shields.io/github/issues/Hutskakinator/Pickle" alt="issues"/>
  <img src="https://img.shields.io/github/forks/Hutskakinator/Pickle" alt="forks"/>
  <img src="https://img.shields.io/github/stars/Hutskakinator/Pickle" alt="stars"/>
  <img src="https://img.shields.io/github/license/Hutskakinator/Pickle" alt="license"/>
  <img src="https://img.shields.io/github/last-commit/Hutskakinator/Pickle" alt="last-commit"/>
</p>

<p align="center">
  <strong>Fifyx</strong> is a feature-rich, customizable Discord bot that enhances your server experience, providing fun interactions, moderation tools, logging, and much more.
</p>

---

<<<<<<< HEAD
## 📋 Table of Contents
-----------------
- [Features](#-features)
- [Installation](#-installation)
- [Commands](#-commands)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
=======
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Setting-Audit-Logs](#Setting-up-audit-logs)
- [Support](#support)
- [License](#license)
>>>>>>> upstream/main

---

## 🚀 Features
------------
- **Fun Commands**: Play games, enjoy trivia, and interact with users in entertaining ways.
- **Moderation Tools**: Powerful moderation features to manage your server with ease.
- **Customizable Prefix**: Adjust the bot's command prefix to match your server's preferences.
- **Logging System**: Integrated logging system to track important server events like user joins, leaves, and moderation actions.
- **User Profiles**: Allow users to create and manage their own profiles, adding a personalized touch to your server.

---

## 📜 Commands
------------

Fifyx includes a total of **154 commands**, divided into two main categories: **Prefix Commands** and **Slash Commands**.

### 🔑 Prefix Commands
- **Community**: Engage with your community through games and fun interactions.
- **Info**: Retrieve useful information about users, servers, roles, and more.
- **Moderation**: Manage your server and enforce rules easily.
- **Music**: Play music, manage queues, and create a lively server atmosphere.
- **Miscellaneous**: Additional commands that offer utility and enhance the user experience.

### 🔧 Slash Commands
- **Community**: Enjoy interactions tailored to a specific user or the whole community.
- **Info**: Display stats, server details, and other informational commands.
- **Moderation**: Quickly manage channels, members, and moderation tasks.
- **Music**: Control music playback and queue in a simple, efficient manner.
- **Miscellaneous**: Commands that don't fit elsewhere but add value to your server.

---

## ⚙️ Installation
------------

### Step 1: Clone the repository
```bash
git clone https://github.com/Hutskakinator/Pickle.git
cd Fifyx
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Set up your environment variables
Copy the `.env.example` file to `.env` and fill in your bot token and other required info. For the development version, rename `.development.example.env` to `.env.development` and fill in the required info.

**Note**: API keys are __not__ required.

### Step 4: Start the bot
- **Normal mode**:  
  ```bash
  node .
  ```
- **Dev mode**:  
  ```bash
  npm run dev
  ```

Make sure Node.js is installed on your system.

---

## ⚙️ Configuration
-------------
- **Prefix**: The default prefix is `?`, but you can change it with the `/change-prefix` command.
- **Logging**: Set up your logging channel using the `/logs setup` command to track server activities.

---

<<<<<<< HEAD
## 🤝 Contributing
------------
=======
## Setting-up-audit-logs

To set the advanced logs registry for the Testify audit-logs ( the event handler registers ) than follow this!

   1. Navigate to `node_modules` **=>** `discord-logs` **=>** `lib` **=>** `index.js` 
   2. Once in the `index.js` file for the discord logs package you'll want to **copy and paste** this code in below.

   ```js
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    const color = {
        red: '\x1b[31m',
        orange: '\x1b[38;5;202m',
        yellow: '\x1b[33m',
        green: '\x1b[32m',
        blue: '\x1b[34m',
        reset: '\x1b[0m',
        pink: '\x1b[38;5;213m'
    }

    function getTimestamp() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const discord_js_1 = require("discord.js");
    const handlers_1 = require("./handlers");
    let eventRegistered = false;
    module.exports = (client, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (eventRegistered)
            return;
        eventRegistered = true;
        const intents = new discord_js_1.IntentsBitField(client.options.intents);
        /* HANDLE GUILDS EVENTS */
        if (intents.has(discord_js_1.IntentsBitField.Flags.Guilds)) {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] ChannelUpdate event handler registered.`);
            client.on('channelUpdate', (oldChannel, newChannel) => {
                (0, handlers_1.handleChannelUpdateEvent)(client, oldChannel, newChannel);
            });
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] GuildUpdate event handler registered.`);
            client.on('guildUpdate', (oldGuild, newGuild) => {
                (0, handlers_1.handleGuildUpdateEvent)(client, oldGuild, newGuild);
            });
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] RoleUpdate event handler registered.`);
            client.on('roleUpdate', (oldRole, newRole) => {
                (0, handlers_1.handleRoleUpdateEvent)(client, oldRole, newRole);
            });
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] ThreadUpdate event handler registered.`);
            client.on('threadUpdate', (oldThread, newThread) => {
                (0, handlers_1.handleThreadChannelUpdateEvent)(client, oldThread, newThread);
            });
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`channelUpdate, guildUpdate, roleUpdate and threadUpdate event handlers not registered (missing Guilds intent).`);
        }
        /* HANDLE MEMBER EVENTS */
        if (intents.has(discord_js_1.IntentsBitField.Flags.GuildMembers)) {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] GuildMemberUpdate event handler registered.`);
            client.on('guildMemberUpdate', (oldMember, newMember) => {
                (0, handlers_1.handleGuildMemberUpdateEvent)(client, oldMember, newMember);
            });
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] UserUpdate event handler registered.`);
            client.on('userUpdate', (oldUser, newUser) => {
                (0, handlers_1.handleUserUpdateEvent)(client, oldUser, newUser);
            });
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log('guildMemberUpdate, userUpdate event handlers not registered (missing GuildMembers intent).');
        }
        /* HANDLE MESSAGE UPDATE EVENTS */
        if (intents.has(discord_js_1.IntentsBitField.Flags.GuildMessages && discord_js_1.IntentsBitField.Flags.MessageContent)) {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] MessageUpdate event handler registered.`);
            client.on('messageUpdate', (oldMessage, newMessage) => {
                (0, handlers_1.handleMessageUpdateEvent)(client, oldMessage, newMessage);
            });
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log('messageUpdate event handler not registered (missing GuildMessages or MessageContent intent).');
        }
        /* HANDLE PRESENCE UPDATE EVENTS */
        if (intents.has(discord_js_1.IntentsBitField.Flags.GuildPresences)) {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] PresenceUpdate event handler registered.`);
            client.on('presenceUpdate', (oldPresence, newPresence) => {
                (0, handlers_1.handlePresenceUpdateEvent)(client, oldPresence, newPresence);
            });
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log('presenceUpdate event handler not registered (missing GuildPresences intent).');
        }
        /* HANDLE VOICE STATE UPDATE */
        if (intents.has(discord_js_1.IntentsBitField.Flags.GuildVoiceStates)) {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log(`${color.pink}[${getTimestamp()}] ${color.reset}[AUDIT_LOGS] VoiceStateUpdate event handler registered.`);
            client.on('voiceStateUpdate', (oldState, newState) => {
                (0, handlers_1.handleVoiceStateUpdateEvent)(client, oldState, newState);
            });
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.debug)
                console.log('voiceStateUpdate event handler not registered (missing GuildVoiceStates intent).');
        }
    });
   ```
   3. This code makes the logs register like so this image below <img align="center" alt="Audit-logs" src="https://i.postimg.cc/NMJfsy0V/Screenshot-2024-10-07-184919.png">
   4. To update the color of the logs, you can change the part `${color.pink}` to the color you'd like which are defined in the color variable. 
   5. That should be it, now when you start up the bot, it should look all cool 😎
>>>>>>> upstream/main

We welcome contributions from the community! Whether you're fixing bugs or adding new features, we appreciate your help.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Check out the [issues page](https://github.com/Hutskakinator/Pickle/issues) for things to work on or suggest new ideas.

---

## 📄 License
-------
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 📞 Contact
-------

If you have any questions or need support, feel free to contact the developers:

- **Huts**: [Discord](https://discord.com/users/980910907695722568)
- **Cat**: [Discord](https://discord.com/users/1286030761002012673)
- [Fifyx Support Server](https://discord.gg/URfA6FZgHW)

---

## 🌟 Star History
-------------

[![Star History Chart](https://api.star-history.com/svg?repos=Hutskakinator/Pickle&type=Date)](https://star-history.com/#Hutskakinator/Pickle&Date)
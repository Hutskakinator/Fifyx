const config = require('../../config');
const mongoose = require('mongoose');
const mongodbURL = process.env.mongodb;
const folderLoader = require('../../utils/folderLoader.js');
const asciiText = require('../../lib/asciiText.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        client.logs.info(`[SCHEMAS] Started loading schemas...`);

        if (!mongodbURL) return;

        mongoose.set("strictQuery", false);
        await mongoose.connect(mongodbURL || ``, {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });

<<<<<<< HEAD
        if (mongoose.connect) {
            client.logs.success('[DATABASE] Connected to MongoDB successfully.');

            const schemaFolder = path.join(__dirname, '../../schemas'); 
            fs.readdir(schemaFolder, (err, files) => {
                if (err) {
                    client.logs.error('[ERROR] Error reading schemas folder:', err);
                    return;
                };
                client.logs.success(`[SCHEMAS] Loaded ${files.length} schema files.`);
            });
        };

        client.logs.info(`[EVENTS] Started loading events...`);
        client.logs.success(`[EVENTS] Loaded ${client.eventNames().length} events.`);
        
        const triggerFolder = path.join(__dirname, '../../triggers'); 
        fs.readdir(triggerFolder, (err, files) => {
            if (err) {
                client.logs.error('Error reading trigger folder:', err);
                return;
            };
            client.logs.info(`[TRIGGERS] Started loading triggers...`);
            client.logs.success(`[TRIGGERS] Loaded ${files.length} trigger files.`);
        });
 
        console.log(`${color.pink}[${getTimestamp()}] ======================================`);
        console.log(`${color.pink}[${getTimestamp()}] ███████╗██╗███████╗██╗   ██╗██╗  ██╗  `);
        console.log(`${color.pink}[${getTimestamp()}] ██╔════╝██║██╔════╝╚██╗ ██╔╝╚██╗██╔╝  `);
        console.log(`${color.pink}[${getTimestamp()}] █████╗  ██║█████╗   ╚████╔╝  ╚███╔╝   `);
        console.log(`${color.pink}[${getTimestamp()}] ██╔══╝  ██║██╔══╝    ╚██╔╝   ██╔██╗   `);
        console.log(`${color.pink}[${getTimestamp()}] ██║     ██║██║        ██║   ██╔╝ ██╗  `);
        console.log(`${color.pink}[${getTimestamp()}] ╚═╝     ╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝  `);
        console.log(`${color.pink}[${getTimestamp()}] ======================================`);
        console.log(`${color.pink}[${getTimestamp()}] ======================================================================================`);
        console.log(`${color.pink}[${getTimestamp()}] ██████╗ ███████╗██╗   ██╗    ██████╗ ██╗   ██╗    ██╗  ██╗██╗   ██╗████████╗███████╗  `);
        console.log(`${color.pink}[${getTimestamp()}] ██╔══██╗██╔════╝██║   ██║    ██╔══██╗╚██╗ ██╔╝    ██║  ██║██║   ██║╚══██╔══╝██╔════╝  `);
        console.log(`${color.pink}[${getTimestamp()}] ██║  ██║█████╗  ██║   ██║    ██████╔╝ ╚████╔╝     ███████║██║   ██║   ██║   ███████╗  `);
        console.log(`${color.pink}[${getTimestamp()}] ██║  ██║██╔══╝  ╚██╗ ██╔╝    ██╔══██╗  ╚██╔╝      ██╔══██║██║   ██║   ██║   ╚════██║  `);
        console.log(`${color.pink}[${getTimestamp()}] ██████╔╝███████╗ ╚████╔╝     ██████╔╝   ██║       ██║  ██║╚██████╔╝   ██║   ███████║  `);
        console.log(`${color.pink}[${getTimestamp()}] ╚═════╝ ╚══════╝  ╚═══╝      ╚═════╝    ╚═╝       ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚══════╝  `);
        console.log(`${color.pink}[${getTimestamp()}] ======================================================================================`);
        console.log(`${color.pink}[${getTimestamp()}] ==================================`);
        console.log(`${color.pink}[${getTimestamp()}] [BOT] ${client.user.username} has been launched!`);
        console.log(`${color.pink}[${getTimestamp()}] [BOT] Watching over ${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)} members!`);
        console.log(`${color.pink}[${getTimestamp()}] [BOT] Watching over ${client.guilds.cache.size} servers!`);
        console.log(`${color.pink}[${getTimestamp()}] ==================================`);

=======
        folderLoader(client);
        asciiText(client)
>>>>>>> upstream/main
        require('events').EventEmitter.defaultMaxListeners = config.eventListeners;
    },
};

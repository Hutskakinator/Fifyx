const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
// Logging Effects //
const color = {
    red: '\x1b[31m',
    orange: '\x1b[38;5;202m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    pink: '\x1b[38;5;213m',
    torquise: '\x1b[38;5;45m',
    purple: '\x1b[38;5;57m',
    reset: '\x1b[0m'
};

function getTimestamp() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function loadEnvironment() {
    const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
    const envPath = path.resolve(process.cwd(), envFile);

    console.log(`${color.green}[${getTimestamp()}]${color.reset} [PROCESS] Loading environment variables from: ${envPath}`);
    if (process.env.NODE_ENV === 'development') { 
        console.log(`${color.green}[${getTimestamp()}]${color.reset} [PROCESS] ${process.env.NODE_ENV} mode has been loaded!`);
    } else {
        console.log(`${color.green}[${getTimestamp()}]${color.reset} [PROCESS] Non-development mode has been loaded!`);
    }

    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
    } else {
        console.error(`${color.red}[${getTimestamp()}] [ERROR] Environment file ${envFile} not found`, error);
        process.exit(1);
    }
}

module.exports = loadEnvironment;
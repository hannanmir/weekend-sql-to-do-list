const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000,
    };
} else {
    config = {
        database: 'weekend-to-do-app', 
        host: 'localhost', 
        port: 5432, 
        max: 10, 
        idleTimeoutMillis: 30000 
    };
}

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error", (err) => {
    console.log("error connecting to postgres", err);
});

module.exports = pool;
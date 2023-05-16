module.exports = {
    PORT: process.env.PORT || 3309,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_USERNAME_PASSWORD: process.env.DB_USERNAME_PASSWORD || 'qwerty',
    DB_NAME: process.env.DB_NAME || 'workdb',
    waitForConnections: true,
    pool: {
        //max: 10,
        //min: 0,
        connectionLimit: 10,
        queueLimit: 0,
        acquire: 30000,
        idle: 10000
    }
};

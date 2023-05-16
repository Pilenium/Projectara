module.exports = {
    PORT: process.env.PORT || 3309,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '',
    DB_USERNAME: process.env.DB_USERNAME || 'root',
    DB_USERNAME_PASSWORD: process.env.DB_USERNAME_PASSWORD || 'qwerty',
    DB_NAME: process.env.DB_NAME || 'workdb',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

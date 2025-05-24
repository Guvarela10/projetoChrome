export default {
    development: {
        dialect: 'sqlite',
        storage: 'database.db'
    },
    production: {
        dialect: 'mysql',
        username: 'root',
        password: '050802100',
        database: 'projetoChrome',
        host: '127.0.0.1'
    }
} 
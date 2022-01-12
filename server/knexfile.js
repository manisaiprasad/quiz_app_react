// Update with your config settings.
require('dotenv').config();// for migration
module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};

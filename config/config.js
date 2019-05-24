require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

module.exports = {
  "development": {
    "username": "postgres",
    "password": "richeese",
    "database": "db_pair_project",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
"production": {
  "use_env_variable": "DATABASE_URL",
  "url": process.env.DATABASE_URL,
  "dialect": "postgres"
}
}
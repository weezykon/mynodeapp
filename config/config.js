module.exports = {
    "development": {
      "username": "express-mynodeapp-dbuser",
      "password": '12345',
      "database": "express-mynodeapp-db",
      "host": "127.0.0.1",
      "dialect": "postgres",
      "post": 5432
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
}

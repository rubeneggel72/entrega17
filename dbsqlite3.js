const dbsqlite3 = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./db/mydb.sqlite3"
  },
  useNullAsDefault: true
});

module.exports =dbsqlite3;
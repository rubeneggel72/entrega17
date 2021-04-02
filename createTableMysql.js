const dbmysql = require('./dbmysql')
upProductos = () => {
  dbmysql.schema.hasTable('productos').then(function (exists) {
    if (!exists) {
      console.log('No existe la tabla productos - Creando tabla');
      return dbmysql.schema.createTable('productos', function (t) {
        t.increments('id').primary()
        t.string('title', 100).notNullable()
        t.string('thumbnail', 100)
        t.integer('price')
        t.integer('stock')
        t.timestamp('created_at').notNullable().defaultTo(dbmysql.fn.now())
      })
    } else console.log('Tabla de productos encontrada');
  })
}
module.exports = upProductos;

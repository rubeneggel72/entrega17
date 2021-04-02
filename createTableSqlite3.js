const dbsqlite3=require("./dbsqlite3")
upMensajes=()=>{dbsqlite3.schema.hasTable('mensajes').then(function(exists) {
    if (!exists) {console.log("No existe la tabla mensajes - Creando tabla ")
      return dbsqlite3.schema.createTable('mensajes', function(t) {
        t.increments('id').primary()
        t.string('message', 100).notNullable()
        t.string('username', 100).notNullable()
        t.timestamp("created_at").notNullable().defaultTo(dbsqlite3.fn.now());
      });
    }
    else{ console.log("Tabla mensajes encontrada")
    dbsqlite3("mensajes").insert({message: "hola baby", username: "ruben"});
  }
  });
}
module.exports =upMensajes

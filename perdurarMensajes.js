const dbsqlite3 = require("./dbsqlite3")
async function create(mensaje) {
    return await dbsqlite3('mensajes')
        .insert(mensaje)
}
module.exports = create

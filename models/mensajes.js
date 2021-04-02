const dbsqlite3=require("./../dbsqlite3")
const list=(params={})=>dbsqlite3('mensajes')
.where(params)
.select("*")

const create=(obj)=>dbsqlite3('mensajes')
.insert(obj)

const update=(params,obj)=>dbsqlite3('mensajes')
.where({id:params})
.update(obj)

const erase=(params)=>dbsqlite3('mensajes')
.where({id:params})
.del()


module.exports={list,create,update,erase};
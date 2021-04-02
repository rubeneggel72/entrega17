const dbmysql=require("./../dbmysql")
const list=(params={})=>dbmysql("productos")
.where(params)
.select("id","title","price","stock","thumbnail","created_at")

const create=(obj)=>dbmysql("productos")
.insert(obj)

const update=(params,obj)=>dbmysql("productos")
.where({id:params})
.update(obj)

const erase=(params)=>dbmysql("productos")
.where({id:params})
.del()




module.exports={list,create,update,erase};
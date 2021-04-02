const express=require('express')
const router=express.Router()
const service=require('../models/mensajes')
const list=(req,res) =>{
    console.log("ALL")
    service.list()
    .then((response) =>res.json(response))
    .catch((err) =>res.json(err))
}
const single =(req,res) =>{
    console.log("SINGLE")
    service.list({id:req.params.id})
    .then((response) =>res.json(response))
    .catch((err) =>res.json(err))
}

const create =(req,res) =>{
    console.log("CREATE mensaje")
    const mensaje=({message,username}=req.body)
    console.log(mensaje)
    return service
        .create(mensaje)
        .then((response) =>res.json(response))
    .catch((err) =>res.json(err))
}

const update =(req,res) =>{
    console.log("UPDATE")
    const producto=({id,message,username,timestamp}=req.body)
    return service
        .update(req.params.id,producto)
        .then((response) =>res.json(response))
    .catch((err) =>res.json(err))
}
const erase =(req,res) =>{
    console.log("DELETE")
    
    return service
        .erase(req.params.id)
        .then((response) =>res.json(response))
    .catch((err) =>res.json(err))
}

router.get('/',list)
router.get('/:id',single)
router.post('/',create)
router.put('/:id',update)
router.delete('/:id',erase)
module.exports =router
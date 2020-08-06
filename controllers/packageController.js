const mongoose = require('mongoose')
const { text, json } = require('express')
const { request } = require('http')
const Package = mongoose.model('Package')

module.exports = {

    //rota para user logado ativar novo plano

    //rota para user logado cancelar plano ativo

    //rota para exibir historico do user logado (5 ultimos planos)

    //checkin
    
    //rota para exibir o plano atual do user logado (posso pegar a descrição daqui)
    async curruntPack (req, res){
        const id = reque.params
        const package = Package.find({_id: id})
        return res.json(package)
    },

    //rota para exibir todos os planos cadastrados
    async show (req, res){
        const package = await Package.find()
        return res.json(package)
    },
    
    //criar novo pacote (Admin)
    async new(req, res){
        const package = await Package.create(req.body)
        return res.json(package)
    },

    //deletar pacote (Admin)
    async del(req, res){
        name = req.name;
        const package = await Package.deleteOne({name:name})
        return res.json(package)
    }
    
    //rota para exibir historico do user selecionado (Admin)
}

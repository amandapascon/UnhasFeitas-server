const mongoose = require('mongoose')
const { text, json } = require('express')
const { request } = require('http')
const Package = mongoose.model('Package')
const User = mongoose.model('User')

module.exports = {

    //rota para user logado ativar novo plano
    //cadastrar no comeco do array, para poder pegar o array[0] como o primeiro
    async activate (req, res){
        const {id} = req.params

        let pack = await Package.findOne({_id: id})

    },

    //rota para user logado cancelar plano ativo
    async deactivate (req, res){

    },
    
    //checkin(pega o plano atual e muda o UsageTime do User de acordo com o valor do duration do package)
    async checkin (req, res){
    },
    
    //rota para exibir o plano atual do user logado (posso pegar a descrição daqui)
    async curruntPack (req, res){
        const {id} = req.params        
        
        let package = await Package.find({_id: id})
        
        if(package)
        return res.json(package)
        else
        return res.json('Erro')
    },
    
    //rota para exibir todos os planos cadastrados
    async show (req, res){
        const package = await Package.find()
        return res.json(package)
    },
    
    //rota para exibir historico do user selecionado (Admin)
    //rota para exibir historico do user logado (5 ultimos planos)
    async historic (req, res){
    
    },
    
    //criar novo pacote (Admin)
    async new(req, res){
        const package = await Package.create(req.body)
        return res.json(package)
    },

    //deletar pacote (Admin)
    async del(req, res){
        const {id} = req.params
        const package = await Package.findByIdAndDelete({_id: id})

        if(package)
            return res.json('Ok')
        else
            return res.json('Erro')
    }    
}

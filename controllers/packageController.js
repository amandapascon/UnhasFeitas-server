const mongoose = require('mongoose')
const { all } = require('../routes')
const { connect } = require('http2')

const Package = mongoose.model('Package')
const User = mongoose.model('User')

module.exports = {

    //rota para user logado ativar novo plano (push, insere no final)
    async activate (req, res){
        const {id_user, id_pack} = req.params

        const update = {'$push': {'packs': {'$each': [id_pack], '$slice': -5}}}

        const user = await User.findByIdAndUpdate({_id: id_user}, update, {new: true})
        
        return res.json(user)        
        //para pegar o ultimo elemento
        //yourCollectionName.find({},{yourArrayFieldName:{$slice:-1}});.
    },

    //rota para user logado cancelar plano ativo (pop, remove do final)
    async deactivate (req, res){
        const {id_user} = req.params

        const update = {'$pop': {'packs': 1, '$slice': -5}}

        const user = await User.findByIdAndUpdate({_id: id_user}, update, {new: true})
        
        return res.json(user)  
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
    async historic (req, res){
        const {id_user} = req.params

        const historic_user = await User.findOne({_id: id_user}, 'packs') 
        console.log(historic_user.packs)

        const packsNames = await Package.findOne({_id: historic_user.packs}).populate(historic_user)

        console.log(packsNames)

        //aaaa.findOne({_id: 'pinto'}).populate('packs')

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

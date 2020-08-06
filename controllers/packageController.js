const mongoose = require('mongoose')
const Package = mongoose.model('Package')

module.exports = {

    //rota para user logado ativar novo plano

    //rota para user logado cancelar plano ativo

    //rota para exibir historico do user logado

    //checkin
    
    //descricao do plano atual do user logado
    async showHistoric (req, res){
        const historic = await Package.find()
        return res.json(historic)
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

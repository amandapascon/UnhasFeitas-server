const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = {
    //rota para exibir todos os usuarios cadastrados (Admin)
    async show(req, res){
        const user = await User.find();
        return res.json(user)
    },

    //rota para criar novo usuario
    async new(req, res){
        const user = await User.create(req.body)
        return res.json(user)
    }

    //rota para logar usuario

    //rota para deslogar usuario


}
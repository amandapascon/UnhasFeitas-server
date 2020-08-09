const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { use } = require('../routes');
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
    },

    //rota para logar usuario
    //verificar se está funcionando
    async login (req, res){
        const {phone, password} = req.body
        
        const user = await User.findOne({phone: phone})

        if(user && (password == user.password)){
            const token = jwt.sign({name: user.name, role: user.role}, process.env.SECRET)
            return res.json({token, name: user.name, admin: user.role == 'admin'})
        }else{
            return res.json({err: 'auth'})
        }
    }
}
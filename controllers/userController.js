const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

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

    //checkin(pega o plano atual e muda o UsageTime do User de acordo com o valor do duration do package) e adciona no handUsage e feetDuration
    async checkin (req, res){
        const usage = req.body

        const update = []

        if (usage[0] == 'hand'){
            const update = {$inc : {'handUsage' : 1}}
        } else if (usage[0]=='hand' && usage[1]=='feet'){
            const update = {$inc : {'handUsage' : 1, 'feetUsage': 1}}
        } else if(usage[0]=='feet'){
            const update = {$inc : {'feetUsage' : 1}}
        }

        const user = await User.findByIdAndUpdate({_id: id_user}, update, {new: true})

        return res.json(user) 
    },

    //rota para logar usuario
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
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const User = mongoose.model('User')

module.exports = {
    //create new user
    async newUser(req, res){
        const {name, phone, password, role} = req.body;
        const passwordHash = await bcrypt.hash(password, 8);

        const userFound = await User.findOne({phone: phone}, (err, user)=>{
            if (err || user) 
                return res.json({err: 'Erro'})
        })

        if(!userFound){
            if(!role){
                const user = await User.create({name: name, phone: phone, password: passwordHash, role: "false"})
                return res.json(user) 
            }
            const user = await User.create({name: name, phone: phone, password: passwordHash, role: role})
            return res.json(user) 
        }
    },

    //user login
    async loginUser(req, res){
        const {phone, password} = req.body;

        const userFound = await User.findOne({phone: phone}, (err, user)=>{
            if (err || !user) 
                return res.json({err: 'Erro'})
        })

        if(userFound){
            const mathPassword = await bcrypt.compare(password, userFound.password)
            if(!mathPassword){
                return res.json({err: 'Erro'})
            }
            //gerar token
            const token = jsonwebtoken.sign({
                id: userFound._id,
                role: userFound.role
            }, "2582cf5038bbd26c8bbf359a25de52e7", {
                subject: userFound.phone,
                expiresIn: "1d"
            })

            return res.json({token, name: userFound.name, phone: userFound.phone, admin: userFound.role == 'admin'})
        }        
    },

    //show an user
    async showUser(req, res){
        const user = await User.findById({_id: req.user.id})

        if(!user){
            return res.status(404).json({err: 'not found'})
        }

        return res.json(user)
        
    },    

    //show all users (admin)
    async showUsers(req, res){
        const user = await User.find()
        return res.json(user)
    }  

    //delete user

    

    //checkin (admin) -> change usageHistory and remainingPack

}
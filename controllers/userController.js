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
                phone: userFound.phone,
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
        const authToken = req.headers.authorization;
        const [, token] = authToken.split(" ");
        jsonwebtoken.verify(token, "2582cf5038bbd26c8bbf359a25de52e7", function(err, decoded) {
            if (err)
                return res.json('Erro')
            
            //next()
            return res.json(decoded.phone)
            //console.log(decoded)
          })
    },    

    //delete user

    //show all users (admin)
    async showUsers(req, res){
        const user = await User.find()
        return res.json(user)
    }  

    //checkin (admin) -> change usageHistory and remainingPack

}
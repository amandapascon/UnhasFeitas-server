const mongoose = require('mongoose');


const User = mongoose.model('User')

module.exports = {
    //create new user
    async newUser(req, res){
        const {name, phone, password} = req.body;

        const user = await User.create({name: name, phone: phone, password: password})
       
        if(!user){
            res.json("Err")
        }

        res.json(user)
    },

    //show an user
    async showUsers(req, res){
        const user = await User.find()
        return res.json(user)
    }

    //user login

    //delete user

    //show all users (admin)

    //checkin (admin) -> change usageHistory and remainingPack

}
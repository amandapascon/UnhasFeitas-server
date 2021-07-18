const mongoose = require('mongoose')

const Scheduling = mongoose.model('Scheduling')
const User = mongoose.model('User')
const Time = mongoose.model('Time')

module.exports = {
    //new scheduling
    async newScheduling(req, res){
        const {date, services} = req.body

        //verificando se user ja tem algum agendamento
        const schedulingFound = await Scheduling.findOne({user: req.user.id}).exec()
        if(schedulingFound)
            return res.status(404).send()

        //verificando se tem remainingPack suficiente
        const user = await User.findById({_id: req.user.id}).exec()
        if(!user)
            return res.status(404).send()
            
        if(services == "Pé e Mão"){
            if(user.remainingPack<2)
                return res.status(404).send()
            
            
            
            //datas consecutivas
            
        }else{
            if(user.remainingPack<1)
                return res.status(404).send()
            let update = []
            update = {$set: {'available': false}}
            const time = await Time.findOneAndUpdate({date: date}, update, {new: true}).exec()
            if(!time)
                return res.status(404).send()
        }
        
        const scheduling = await Scheduling.create({date: date, user: req.user.id, services: services})
        if(!scheduling)
                return res.status(404).send()
        else
            return res.status(200).json(scheduling)
    },

    //delete scheduling
    async deleteScheduling(req, res){
        const {id_scheduling} = req.params

        const scheduling = await Scheduling.findById({_id: id_scheduling})
        if(!scheduling)
            return res.status(404).send()

        if(scheduling.services == "Pé e Mão"){

        }else{
            let update = []
            update = {$set: {'available': true}}
            const time = await Time.findOneAndUpdate({date: scheduling.date}, update, {new: true}).exec()
            if(!time)
                return res.status(404).send()
        }

        const deleteScheduling = await Scheduling.findByIdAndDelete({_id: id_scheduling}).exec()    
        if(deleteScheduling)
            return res.status(200).send()
        else
            return res.status(404).send()
    },

    //user scheduling
    async schedulingUser(req, res){
        const scheduling = await Scheduling.findOne({user: req.user.id}).exec() 
        if(!scheduling)
            return res.status(404).send()
        else
            return res.status(200).json(scheduling)
    },

    //show all scheduling (admin)
    async showScheduling(req, res){
        const scheduling = await Scheduling.find().exec() 
        if(!scheduling)
            return res.status(404).send()
        else
            return res.status(200).json(scheduling)
    },

    //checkin (admin) -> change usageHistory and remainingPack
    async checkin(req, res){
        const {id_scheduling} = req.params

        const scheduling = await Scheduling.findById({_id: id_scheduling}).exec() 
        if(!scheduling)
            return res.status(404).send()
        
        let user = await User.findById({_id: scheduling.user}).exec() 
        if(!user)
            return res.status(404).send()
        
        let update = []
        if(scheduling.services == "Pé e Mão"){
            return res.status(400).json({err: "not yet"})

        }else{
            update = {$inc: {'remainingPack' : -1}, '$push': {'usageHistory': {'$each': [scheduling.services]}, 'dateHistory': {'$each': [scheduling.date]}}}
        }
        
        user = await User.findByIdAndUpdate({_id: scheduling.user}, update, {new: true}).exec()
        if(!user)
            return res.status(404).send()
        
        if(user.remainingPack == 0){
            update = {$set: {'pack': null}}
            user = await User.findByIdAndUpdate({_id: scheduling.user}, update, {new: true}).exec()
            if(!user)
                return res.status(404).send()
        }

        const deleteScheduling = await Scheduling.findByIdAndDelete({_id: id_scheduling}).exec()    
        if(deleteScheduling)
            return res.status(200).send()
        else
            return res.status(404).send()        
    },
}
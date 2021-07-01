const mongoose = require('mongoose')

const Scheduling = mongoose.model('Scheduling')
const User = mongoose.model('User')
const Time = mongoose.model('Time')

module.exports = {
    //new scheduling
    async newScheduling(req, res){
        const {date, services} = req.body

        //verificando se user ja tem algum agendamento
        const schedulingFound = await Scheduling.findOne({user: req.user.id}, (err, scheduling)=>{
            if(err || scheduling)
                return res.status(404).json({err: "Erro"})
        })
        if(!schedulingFound){
            //verificando se tem remainingPack suficiente
            const user = await User.findById({_id: req.user.id}, (err)=>{
                if(err)
                    return res.status(404).json({err: "Erro"})
            })
            if(user){
                if(services == "Pé e Mão"){
                    if(user.remainingPack<2)
                        return res.status(404).json({err: "Erro"})
                    //datas como not available
                    let update = []
                    update = {$set: {'available': false}}
                    await Time.findOneAndUpdate({date: date}, update, {new: true},(err)=>{
                        if (err) 
                            return res.status(404).json({err: 'Erro'})
                    })
                }else{
                    if(user.remainingPack<1)
                        return res.status(404).json({err: "Erro"})
                    //data como not available
                    let update = []
                    update = {$set: {'available': false}}
                    await Time.findOneAndUpdate({date: date}, update, {new: true},(err)=>{
                        if (err) 
                            return res.status(404).json({err: 'Erro'})
                    })
                }
                
                const scheduling = await Scheduling.create({date: date, user: req.user.id, services: services})
                if(!scheduling)
                    return res.status(404).json({err: "Erro"})

                return res.status(200).json(scheduling)
            }

        }

        


    },

    

    //delete scheduling

    //user scheduling
    async schedulingUser(req, res){
        const scheduling = await Scheduling.findOne({user: req.user.id})
        return res.status(200).json(scheduling)
    },

    //show all scheduling (admin)
    async showScheduling(req, res){
        const scheduling = await Scheduling.find()
        return res.status(200).json(scheduling)
    },

    //checkin (admin) -> change usageHistory and remainingPack
}
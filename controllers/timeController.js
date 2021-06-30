const mongoose = require('mongoose')
const { relative } = require('path/posix')

const Time = mongoose.model('Time')

module.exports = {
    //new time
    async newTime(req, res){
        const {date} = req.body

        if(!(new Date() < new Date(date)))
            return res.status(404).json({err: "Erro"})

        else{
            const timeFound = await Time.findOne({date: date}, (err, time)=>{
                if (err || time) 
                    return res.status(404).json({err: 'Erro'})
            })

            if(!timeFound){
                const time = await Time.create({date: date})
                if(!time)
                    return res.status(404).json({err: "Erro"})

                return res.status(200).json(time)
            }
        }        
    },

    //show all avaiables times
    async showTime(req, res){
        const time = await Time.find().where('available').equals(true)
        return res.status(200).json(time)
    },

    //delete time (admin)
    async deleteTime(req, res){
        const {id_time} = req.params
        const time = await Time.findByIdAndDelete({_id: id_time})
        if(time)
            return res.status(200).json('Ok')
        else
            return res.status(404).json('Erro')
    }
}
const mongoose = require('mongoose')
const { relative } = require('path/posix')

const Scheduling = mongoose.model('Scheduling')

module.exports = {
    //new scheduling

    

    //delete scheduling

    //user scheduling
    async schedulingUser(req, res){
        const scheduling = await Scheduling.findById({_id: req.user.id})
        return res.status(200).json(scheduling)
    }

    //show all scheduling (admin)

    //checkin (admin) -> change usageHistory and remainingPack
}
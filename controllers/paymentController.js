const mongoose = require('mongoose')

const Payment = mongoose.model('Payment')
const Package = mongoose.model('Package')
const User = mongoose.model('User')

module.exports = {
    //user payment (ask for a new start package)
    async newPayment(req, res){
        const {id_pack} = req.params    

        const user = await User.findById({_id: req.user.id})
        if(!user){
            return res.status(404).json({err: 'not found'})
        }

        const pack = await Package.findById({_id: id_pack})  
        if(!pack){
            return res.status(404)
        }

        const paymentFound = await Payment.findOne({user: user._id}, (err, pay)=>{
            if (err || pay) 
                return res.status(404).json({err: 'Erro'})
        })

        if(!paymentFound){
            if(user.pack!=null){
                return res.status(404)
            }
            const payment = await Payment.create({user: user._id, pack: pack._id})
            return res.json(payment)
        }        
    },

    //delete some payment
    async deletePayment(req, res){
        const {id_payment} = req.params

        const payment = await Payment.findByIdAndDelete({_id: id_payment})

        if(payment)
            return res.status(200).json('Ok')
        else
            return res.status(404).json('Erro')        
    },

    //show all payments

    
    //check payment (admin)
    async checkPayment(req, res){
        const {id_payment} = req.params
        const payment = await Payment.findById({_id:id_payment})
        if(!payment)
            return res.status(404)
        
        const package = await Package.findById({_id:payment.pack})

        let update = []
        update = {$set: {'pack': package._id, 'usageHistory': [], 'remainingPack':package.duration}}
        const user = await User.findByIdAndUpdate({_id: payment.user}, update, {new: true})

        if(!user)
            return res.status(404)

        return res.status(200).json(user) 
    }

}
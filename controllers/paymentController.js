const mongoose = require('mongoose')

const Payment = mongoose.model('Payment')
const Package = mongoose.model('Package')
const User = mongoose.model('User')

module.exports = {
    //user payment (ask for a new start package)
    async newPayment(req, res){
        const {id_pack} = req.params

        const user = await User.findById({_id: req.user.id}).exec()
        if(!user){
            return res.status(404).send()
        }

        const pack = await Package.findOne({_id: id_pack}).exec()
        if(!pack){
            return res.status(404).send()
        }

        const paymentFound = await Payment.findOne({user: user._id}).exec()
        if(paymentFound){
            return res.status(404).send()
        }

        if(user.pack){
            return res.status(404).send()
        }else{
            const payment = await Payment.create({user: user._id, pack: pack._id})
            return res.status(200).json(payment)
        } 
    },

    //delete some payment
    async deletePayment(req, res){
        const {id_payment} = req.params

        const payment = await Payment.findByIdAndDelete({_id: id_payment}).exec()

        if(payment)
            return res.status(200).send()
        else
            return res.status(404).send()    
    },

    //show all payments
    async showPayments(req, res){
        const payment = await Payment.find().exec()

        if(!payment)
            return res.status(404).send()
        else
            return res.status(200).json(payment)
    },

    
    //check payment (admin)
    async checkPayment(req, res){
        const {id_payment} = req.params

        const payment = await Payment.findById({_id:id_payment}).exec()
        if(!payment)
            return res.status(404).send()
            
        const package = await Package.findById({_id:payment.pack}).exec()
        if(!package)
            return res.status(404).send()

        let update = []
        update = {$set: {'pack': package._id, 'usageHistory': [], 'dateHistory':[], 'remainingPack':package.duration}}
        const user = await User.findByIdAndUpdate({_id: payment.user}, update, {new: true}).exec()
        if(!user)
            return res.status(404).send()
        
        const deletePay = await Payment.findByIdAndDelete({_id: id_payment}).exec()    
        if(deletePay)
            return res.status(200).send()
        else
            return res.status(404).send()
    }
}
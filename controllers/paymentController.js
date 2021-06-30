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

        if(user){
            try{
                const pack = await Package.findOne({_id: id_pack},(err)=>{
                    if (err) 
                        return res.status(404).json({err: 'Erro'})
                })
                const paymentFound = await Payment.findOne({user: user._id})
                
                if(paymentFound == null){
                    if(user.pack){
                        return res.status(404).json({err: 'Erro'})
                    }else{
                        const payment = await Payment.create({user: user._id, pack: pack._id})
                        return res.status(200).json(payment)
                    }                    
                } 
            }catch(err){
                return res.status(404)
            }            
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
    async showPayments(req, res){
        const payment = await Payment.find()

        if(!payment)
            return res.status(404)

        return res.status(200).json(payment)
    },

    
    //check payment (admin)
    async checkPayment(req, res){
        const {id_payment} = req.params
        try{
            const payment = await Payment.findById({_id:id_payment},(err)=>{
                if (err) 
                    return res.status(404).json({err: 'Erro'})
            })

            if(payment){
                const package = await Package.findById({_id:payment.pack},(err)=>{
                    if (err) 
                        return res.status(404).json({err: 'Erro'})
                })
    
                let update = []
                update = {$set: {'pack': package._id, 'usageHistory': [], 'remainingPack':package.duration}}
                const user = await User.findByIdAndUpdate({_id: payment.user}, update, {new: true},(err)=>{
                    if (err) 
                        return res.status(404).json({err: 'Erro'})
                })
    
                if(!user)
                    return res.status(404).json({err: 'Erro'})
    
                const deletePay = await Payment.findByIdAndDelete({_id: id_payment})
    
                if(deletePay)
                    return res.status(200).json('Ok')
                else
                    return res.status(404).json('Erro')   
            }           

        }catch(err){
            return res.status(404).json({err: 'Erro'})
        }                
    }

}
const Razorpay = require('razorpay');


const orderProcessController = async(req,res) => {

    try{
        let instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

        let orderData = await instance.orders.create({
          amount: 50000,
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            key1: "value3",
            key2: "value2"
          }
        })
    
        res.json({orderId:orderData.id,amount:orderData.amount,currency:orderData.currency})
    } catch(e){
        console.log("e====>",e)
    }
   
}

const paymentProcessController = async (req,res) =>{
  console.log("eewewe===>",req.body)

}

module.exports = {orderProcessController,paymentProcessController};

const Razorpay = require('razorpay');
const crypto = require('crypto');
const orderProcessController = async (req, res) => {
  try {
    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log("req.body==>",req.body)

    let orderData = await instance.orders.create({
      amount: req.body.amount*100,
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        key1: 'value3',
        key2: 'value2',
      },
    });

    res.json({
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
    });
  } catch (e) {
    console.log('e====>', e);
  }
};

const paymentProcessController = async (req, res) => {
  console.log('eewewe===>', req.body);
};

const verifyPaymentController = async (req, res) => {
  console.log('===>', req.body);
  let { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body.response;
  let orderId = req.body.orderId;
  console.log(
    'req----->',
    orderId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  );

  // let generated_signature = hmac_sha256(orderId + "|" + razorpay_payment_id, process.env.RAZORPAY_KEY_SECRET);
  let generated_signature = orderId + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(generated_signature.toString())
    .digest('hex');

  console.log(
    'wewew===>,',
    expectedSignature,
    'wd==>',
    generated_signature,
    generated_signature == razorpay_signature
  );
  if (expectedSignature == razorpay_signature) {
    res.json({
      message: 'Payment successful',
      data: {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        orderId,
      },
    });
  }
};

module.exports = {
  orderProcessController,
  paymentProcessController,
  verifyPaymentController,
};

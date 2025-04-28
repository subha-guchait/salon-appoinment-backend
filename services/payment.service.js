const {
  generateRandomString,
} = require("../utilities/generateRandomString.utility");
const Payment = require("../models/payment.model");
const Appoinment = require("../models/appoinment.model");

exports.createPaymentOrderId = exports.createPaymentOrderId = () => {
  return `PAY-${generateRandomString()}`;
};

exports.savePaymentDetails = async (paymentDetails) => {
  try {
    return await Payment.create(paymentDetails);
  } catch (err) {
    console.log(err);
    throw new Error("Unable to save payment details");
  }
};

exports.updateTransactionStatus = async (paymentId, status) => {
  try {
    const payment = await Payment.findOne({ where: { paymentId: paymentId } });
    if (!payment) {
      throw new Error("Payment not found");
    }

    payment.status = status;
    return await payment.save();
  } catch (err) {
    console.log(err);
    throw new Error("unable to update payment status");
  }
};

exports.getPaymentDetails = async (paymentId) => {
  try {
    return await Payment.findOne({ where: { paymentId: paymentId } });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to get payment details");
  }
};

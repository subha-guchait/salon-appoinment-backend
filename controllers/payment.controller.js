const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");
const {
  createPaymentOrderId,
  savePaymentDetails,
  updateTransactionStatus,
} = require("../services/payment.service");
const { getServiceRecord } = require("../services/service.service");
const {
  createorder,
  getPaymentStatus,
} = require("../services/cashfree.service");
const { getAppoinmentDetails } = require("../services/appoinment.service");

exports.processPayment = asyncHandler(async (req, res, next) => {
  const { appoinmentId } = req.body;

  const orderId = createPaymentOrderId();
  const orderAmount = await getAppoinmentDetails(appoinmentId).amount;

  if (!amount) {
    return next(new ErrorHandler("service not found", 404));
  }

  const orderCurrency = "INR";
  const customerID = req.user.id;
  const customerPhone = req.user.phone;
  const customerName = req.user.name;
  const customerEmail = req.user.email;

  const paymentSessionId = await createorder(
    orderId,
    orderAmount,
    orderCurrency,
    customerID,
    customerPhone,
    customerName,
    customerEmail
  );

  if (!paymentSessionId) {
    return next(new ErrorHandler("Unable to create payment session", 500));
  }

  //save the payment details in the database
  await savePaymentDetails({
    paymentId: orderId,
    paymentsessionid: paymentSessionId,
    customerName: customerName,
    customeremail: customerEmail,
    customerPhone: customerPhone,
    amount: orderAmount,
    currency: orderCurrency,
    status: "pending",
    appoinmentId: appoinmentId,
  });
});

exports.updatepaymentStatus = asyncHandler(async (req, res, next) => {
  const { paymentId } = req.params;

  const paymentStatus = await getPaymentStatus(paymentId);

  if (!paymentStatus) {
    return next(new ErrorHandler("Unable to get payment status", 500));
  }

  await updateTransactionStatus(orderId, paymentStatus);

  res.status(200).json({ sucess: true, paymentStatus });
});

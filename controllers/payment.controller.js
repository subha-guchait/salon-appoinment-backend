const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");
const {
  createPaymentOrderId,
  savePaymentDetails,
  updateTransactionStatus,
  getPaymentDetails,
} = require("../services/payment.service");
const { getServiceRecord } = require("../services/service.service");
const {
  createorder,
  getPaymentStatus,
} = require("../services/cashfree.service");
const {
  getAppoinmentDetailsWithService,
  updateAppoinmentPaymentStatus,
} = require("../services/appoinment.service");

exports.processPayment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.body;
  console.log("appoinment Id .....", appointmentId);

  const orderId = createPaymentOrderId();
  const appoinment = await getAppoinmentDetailsWithService(appointmentId);

  const orderAmount = appoinment.amount;

  console.log("order amount....... ", appoinment);

  if (!orderAmount) {
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
  console.log({
    paymentId: orderId,
    paymentsessionid: paymentSessionId,
    customerName: customerName,
    customeremail: customerEmail,
    customerPhone: customerPhone,
    amount: orderAmount,
    currency: orderCurrency,
    status: "pending",
    appoinmentId: appointmentId,
  });
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
    appoinmentId: appointmentId,
  });

  res.status(200).json({ sucess: true, paymentSessionId, orderId });
});

exports.updatepaymentStatus = asyncHandler(async (req, res, next) => {
  const { paymentId } = req.params;

  const paymentStatus = await getPaymentStatus(paymentId);

  console.log("payment status..........", paymentStatus);

  if (!paymentStatus) {
    return next(new ErrorHandler("Unable to get payment status", 500));
  }

  if (paymentStatus === "Success") {
    const paymentDetails = await getPaymentDetails(paymentId);

    const appoinmentId = paymentDetails.appoinmentId;

    await updateAppoinmentPaymentStatus(appoinmentId, "Paid");
  }

  await updateTransactionStatus(paymentId, paymentStatus);

  res.status(200).json({ sucess: true, paymentStatus });
});

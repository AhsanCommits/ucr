import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const getPaymentIntent = async (paymentIntentId) => {
  return await stripe.paymentIntents.retrieve(paymentIntentId);
};

const handler = async (req, res) => {
  const { paymentIntentId } = req.body;
  try {
    const payment_intent = await getPaymentIntent(paymentIntentId);
    //Return the payment_intent object
    res.status(200).json(payment_intent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
};

export default handler;

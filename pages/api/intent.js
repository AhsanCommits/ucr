import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const saveToAirtable = async (formData, carrierData) => {
  return "airtableId";
};

const makeAmount = (carrierData) => {
  let amount = 0;
  switch (true) {
    case carrierData.totalPowerUnits <= 2:
      amount = 85;
      break;
    case carrierData.totalPowerUnits <= 5:
      amount = 245;
      break;
    case carrierData.totalPowerUnits <= 20:
      amount = 485;
      break;
    case carrierData.totalPowerUnits <= 100:
      amount = 1750;
      break;
    case carrierData.totalPowerUnits <= 1000:
      amount = 6250;
      break;
  }
  return amount * 100;
};

const handler = async (req, res) => {
  const { formData, carrierData } = req.body;

  // Save to Airtable
  const airtableId = await saveToAirtable(formData, carrierData);

  try {
    if (!airtableId) {
      throw new Error("Could not save to Airtable");
    }

    // Create PaymentIntent
    const params = {
      amount: makeAmount(carrierData),
      currency: "usd",
      description: "Payment description",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        airtableId,
        ...formData,
      },
      receipt_email: formData.email,
    };

    const payment_intent = await stripe.paymentIntents.create(params);
    //Return the payment_intent object
    res.status(200).json(payment_intent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
};
export default handler;

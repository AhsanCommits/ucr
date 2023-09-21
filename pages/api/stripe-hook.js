import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateAirtable = async (paymentIntent) => {
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}/${paymentIntent.metadata.airtableId}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        "Payment Status": "Paid",
        "Payment Intent ID": paymentIntent.id,
      },
    }),
  });
  const data = await response.json();
  // console.log("airtable response", data);
  return data;
};

const handler = async (req, res) => {
  const buf = await new Promise((resolve) => {
    let buf = "";
    req.on("data", (chunk) => {
      buf += chunk.toString();
    });
    req.on("end", () => {
      resolve(buf);
    });
  });

  try {
    let event;
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_S
      );
    } catch (err) {
      console.log(err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        await updateAirtable(paymentIntent);
        console.log("PaymentIntent was successful!");
        break;
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
};

export default handler;

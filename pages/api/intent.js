import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const getClassification = (formData) => {
  let classification = [];

  if (formData.broker) {
    classification.push("Broker");
  }

  if (formData.freightForwarder) {
    classification.push("Freight Forwarder");
  }

  if (formData.leasingCompany) {
    classification.push("Leasing Company");
  }

  if (formData.motorCarrier) {
    classification.push("Motor Carrier");
  }

  if (formData.motorPrivateCarrier) {
    classification.push("Motor Private Carrier");
  }

  return classification.join(", ");
};

const saveToAirtable = async (formData, carrierData) => {
  const obj = {
    "Certificate?": formData.certificationNeeded,
    Classification: getClassification(formData),
    "Number of Units": `${carrierData.totalPowerUnits}`,
    Street: carrierData.phyStreet,
    "Processing Time": formData.processingTime,
    "DOT Number": carrierData.dotNumber,
    "Customer Certified": true,
    "Who is creating the registration?": formData.fullName,
    Email: formData.email,
    "Digital Signature": formData.signature,
    "Registration Year": formData.registrationYear,
    State: carrierData.phyState,
    "Zip Code": carrierData.phyZipcode,
    "Carrier Name": carrierData.legalName,
    City: carrierData.phyCity,
    "Payment Status": "Pending",
    Amount: makeAmount(carrierData) / 100,
  };

  // console.log("saving to airtable", obj);

  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;
    // console.log("url", url, process.env.AIRTABLE_API_KEY);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: obj,
          },
        ],
      }),
    });
    const data = await response.json();
    // console.log("airtable response", data);
    return data.records[0].id;
  } catch (error) {
    console.log(error);
    return null;
  }
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

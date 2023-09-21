const handler = async (req, res) => {
  try {
    // save contact us form data to airtable
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/tblwhV9J90KZPL2Lt`;

    const payload = {
      records: [
        {
          fields: {
            Name: req.body.fullName,
            Email: req.body.email,
            "DOT Number": Number(req.body.usDotNumber),
            Message: req.body.message,
          },
        },
      ],
    };

    console.log("payload", payload.records[0].fields);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    console.log("airtable response", data);

    if (!data.records[0].id) {
      throw new Error("Could not save to Airtable");
    }

    res.status(200).json({ message: "message received." });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
};

export default handler;

import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/Registration/Payment/CheckoutForm";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");
  useEffect(() => {
    // get from local storage
    const paymentIntent = localStorage.getItem("paymentIntent");
    if (paymentIntent) {
      try {
        let p = JSON.parse(paymentIntent);
        setPaymentIntent(p);
        setClientSecret(p.client_secret);
      } catch (error) {
        console.log(error);
        alert("Error getting payment intent");
        window.location.href = "/";
      }
    }
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <section className="section-style">
      <div className="flex-col space-y-6 container-style md:px-12 md:py-12">
        <Head>
          <title>UCR Payment</title>
        </Head>

        <h1 className="p-2 text-4xl font-bold text-center text-gray-700">
          Confirm Payment
        </h1>

        {paymentIntent && (
          <Elements options={options} stripe={stripe}>
            <CheckoutForm paymentIntent={paymentIntent} />
          </Elements>
        )}
      </div>
    </section>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/Registration/Payment/CheckoutForm';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntent, setPaymentIntent] = useState('');
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads using our local API
    fetch('api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 30000,
        payment_intent_id: '',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret), setPaymentIntent(data.id);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <section className="section-style">
      <div className="container-style flex-col md:px-12 md:py-20 space-y-6">
        <Head>
          <title>UCR Payment</title>
        </Head>
        <Image src={'/logo.png'} alt="Site Logo" width={146} height={146} />
        <h1 className="text-4xl font-bold text-gray-700 p-2 text-center">
          Unified Carrier Registration (UCR)
        </h1>

        {clientSecret && (
          <Elements options={options} stripe={stripe}>
            <CheckoutForm paymentIntent={paymentIntent} />
          </Elements>
        )}
      </div>
    </section>
  );
}

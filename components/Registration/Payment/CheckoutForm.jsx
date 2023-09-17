import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function Form(paymentIntent) {
  const [email, setEmail] = useState('');
  const [locAmount, setLocAmount] = useState('245');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    //Grab the client secret from url params
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleAmount = async (val) => {
    setLocAmount(val);
    fetch('api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: val * 100,
        payment_intent_id: paymentIntent.paymentIntent,
      }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('not loaded');
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://ucr.vercel.app/success',
        receipt_email: email,
        shipping: {
          address: { city: 'NY' },
          name: 'Shipping user',
        },
        payment_method_data: {
          billing_details: {
            name: 'Billing user',
          },
        },
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto my-10"
      >
        <div className="mb-3 text-gray-700">
          Total due
          <input
            id="amount"
            type="text"
            value={`${locAmount} $`}
            className="block
            w-full
            rounded-md
            border-gray-300
            shadow-sm h-12 px-4"
            onChange={(e) => handleAmount(e.target.value)}
            disabled
          />
        </div>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement id="payment-element" />
        <div className="text-center">
          <button
            className="md:w-1/2 w-full rounded-full text-white bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all my-4 px-8 py-4"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                'Pay now'
              )}
            </span>
          </button>
        </div>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}

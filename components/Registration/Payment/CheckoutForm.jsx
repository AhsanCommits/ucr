import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function Form({ paymentIntent }) {
  const [email, setEmail] = useState(paymentIntent.receipt_email);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [stripeElementsLoaded, setStripeElementsLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("not loaded");
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://" + window.location.host + "/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto my-10"
      >
        <div className="mb-3 text-gray-700">
          Total due
          <input
            id="amount"
            type="text"
            value={`${
              paymentIntent.amount / 100
            } ${paymentIntent.currency?.toUpperCase()}`}
            className="block w-full h-12 px-4 font-bold border-gray-300 rounded-md shadow-sm"
            disabled
          />
        </div>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement
          options={{
            defaultValues: {
              billingDetails: {
                email: email,
              },
            },
          }}
          onReady={() => {
            setStripeElementsLoaded(true);
          }}
          id="payment-element"
        />
        <div className="text-center">
          {stripeElementsLoaded ? (
            <button
              className=" w-full rounded-full text-white bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all my-4 px-8 py-4
            disabled:opacity-50 disabled:cursor-not-allowed
            "
              id="submit"
              disabled={isLoading === true || !stripe || !elements}
            >
              <span id="button-text">
                {isLoading ? "Please Wait..." : "Pay Now"}
              </span>
            </button>
          ) : (
            <div className="flex items-center justify-center mt-5">
              <div className="w-10 h-10 border-4 border-gray-400 rounded-full border-t-blue-500 animate-spin"></div>
            </div>
          )}
        </div>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-center text-gray-500">
            {message}
          </div>
        )}
      </form>
    </>
  );
}

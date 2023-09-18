import Link from "next/link";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function load() {
      // get intentid and client secret from url
      const urlParams = new URLSearchParams(window.location.search);
      const intentId = urlParams.get("payment_intent");
      const clientSecret = urlParams.get("client_secret");

      // call stripe api to confirm payment
      try {
        const resp = await fetch("/api/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: intentId,
          }),
        });

        const paymentIntent = await resp.json();

        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            break;

          case "requires_payment_method":
            setMessage("Payment failed. Please try another payment method.");
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      } catch (error) {
      } finally {
        localStorage.removeItem("paymentIntent");
      }
    }
    load();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-5 p-8 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-600">
          {message ? message : "Processing payment..."}
        </h1>
        <p className="text-lg text-gray-700">
          {/* Thank you for your payment. Your order has been successfully
          processed. */}
        </p>
        <Link
          href="/"
          className="md:w-1/2 w-full rounded-full bg-[#004990] hover:bg-[#003972] text-white py-3 px-4 hover:scale-110 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;

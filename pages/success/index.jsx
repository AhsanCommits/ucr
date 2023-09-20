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

        setMessage(paymentIntent.status);
        // switch (paymentIntent.status) {
        //   case "succeeded":
        //     break;

        //   case "processing":
        //     setMessage(
        //       "Payment processing. We'll update you when payment is received."
        //     );
        //     break;

        //   case "requires_payment_method":
        //     setMessage("Payment failed. Please try another payment method.");
        //     // Redirect your user back to your payment page to attempt collecting
        //     // payment again
        //     break;

        //   default:
        //     setMessage("Something went wrong.");
        //     break;
        // }
      } catch (error) {
      } finally {
        localStorage.removeItem("paymentIntent");
      }
    }
    load();
  }, []);

  return (
    <div className="flex items-center justify-center w-full p-5 my-40">
      <div>
        {message ? (
          <div className="flex flex-col items-center w-full gap-5 p-8 text-center rounded-lg">
            <div className="text-gray-600">
              {message === "succeeded" ? (
                <div className="flex flex-col gap-5">
                  <h1 className="text-3xl font-semibold text-gray-600">
                    Thank you.
                  </h1>
                  <p className="text-gray-500">
                    We will email you a confirmation when the registration is
                    complete.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <h1 className="text-3xl font-semibold text-gray-600">
                    Something went wrong.
                  </h1>
                  <p className="text-gray-500">
                    {message === "processing"
                      ? "Payment processing. We'll update you when payment is received."
                      : "Payment failed. Please try another payment method."}
                  </p>
                </div>
              )}
            </div>
            <Link
              href="/"
              className="md:w-1/2 w-full rounded-full bg-[#004990] hover:bg-[#003972] text-white py-3 px-4 hover:scale-110 transition-all"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          // spinner without svg
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-400 rounded-full border-t-blue-500 animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

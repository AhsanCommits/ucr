import Link from 'next/link';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Thank you for your payment. Your order has been successfully
          processed.
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

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import RegisterForm from '@/components/Registration/registerForm';
import CarrierData from '@/components/Registration/carrierData';
import Classification from '@/components/Registration/classification';
import FurtherClassification from '@/components/Registration/furtherClassification';
import ErrorMessage from '@/components/ErrorMessage';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const formSchema = z.object({
  usDotNumber: z.string().min(1).max(10),
  email: z.string().email(),
  terms: z.boolean().refine((val) => val === true),
  motorCarrier: z.boolean(),
  motorPrivateCarrier: z.boolean(),
  freightForwarder: z.boolean(),
  broker: z.boolean(),
  leasingCompany: z.boolean(),
  certificationNeeded: z.string(),
  processingTime: z.string(),
  registrationYear: z.string(),
  fullName: z.string(),
  signature: z.string(),
  checkAuthorization: z.boolean(),
});

const RegisterPage = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState('Register');
  const [apiError, setApiError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [apiCalled, setApiCalled] = useState(false); // Track whether the API has been called
  const [carrierData, setCarrierData] = useState({});
  const [formData, setFormData] = useState({
    usDotNumber: '',
    email: '',
    terms: false,
    motorCarrier: false,
    motorPrivateCarrier: false,
    freightForwarder: false,
    broker: false,
    leasingCompany: false,
    certificationNeeded: '',
    processingTime: '',
    registrationYear: '',
    fullName: '',
    signature: '',
    checkAuthorization: false,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usDotNumber: '',
      email: '',
      terms: false,
      motorCarrier: false,
      motorPrivateCarrier: false,
      freightForwarder: false,
      broker: false,
      leasingCompany: false,
      certificationNeeded: '',
      processingTime: '',
      registrationYear: '',
      fullName: '',
      signature: '',
      checkAuthorization: false,
    },
  });

  // Submit Handler.
  async function onSubmit(values) {
    setFormData({
      usDotNumber: values.usDotNumber,
      email: values.email,
      terms: values.terms,
      motorCarrier: values.motorCarrier,
      motorPrivateCarrier: values.motorPrivateCarrier,
      freightForwarder: values.freightForwarder,
      broker: values.broker,
      leasingCompany: values.leasingCompany,
      certificationNeeded: values.certificationNeeded,
      processingTime: values.processingTime,
      registrationYear: values.registrationYear,
      fullName: values.fullName,
      signature: values.signature,
      checkAuthorization: values.checkAuthorization,
    });

    if (!apiCalled) {
      // Check if the API hasn't been called before
      const apiUrl = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${values.usDotNumber}/?webKey=304b4c98190bd95d648de8f80478c6d7f3c3af0a`;

      try {
        setIsLoading('Loading...');
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarrierData(data.content.carrier);
        console.log('API Response:', data.content.carrier);
        setApiCalled(true); // Set the state to indicate that the API has been called
        setPage(page + 1); // Navigate to the next page after successful API response
        setIsLoading('Register');
      } catch (error) {
        console.error('Error:', error);
        setIsLoading('Register');
        setApiError('Failed to fetch data from the API');
        setShowError(true);
      }
    } else {
      setPage(page + 1); // Navigate to the next page without calling the API again
    }
  }
  const handleCloseError = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (apiError) {
      // Automatically close the error message after 5 seconds
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [apiError]);

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <RegisterForm form={form} />;
      case 1:
        return (
          <CarrierData
            formDataEmail={formData.email}
            carrierData={carrierData}
          />
        );
      case 2:
        return <Classification form={form} />;
      default:
        return <FurtherClassification form={form} />;
    }
  };

  return (
    <section className="section-style">
      <div className="container-style flex-col md:px-12 md:py-20 space-y-6">
        {page === 0 ? (
          <>
            <Image src={'/logo.png'} alt="Site Logo" width={146} height={146} />
            <h1 className="text-4xl font-bold text-gray-700 p-2 text-center">
              Unified Carrier Registration (UCR)
            </h1>
          </>
        ) : (
          ''
        )}

        <div
          className={cn(
            page === 0 ? 'md:w-1/2 sm:w-full' : 'md:w-full sm:w-full'
          )}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={cn(
                page === 0 || page === 1 ? 'space-y-8' : 'space-y-4'
              )}
            >
              {conditionalComponent()}
              <div className={cn(page === 0 ? 'text-center' : 'text-left')}>
                {page >= 3 ? (
                  <Link href={'/payment'}>
                    <Button
                      type="submit"
                      className="md:w-1/3 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7"
                    >
                      Continue
                    </Button>
                  </Link>
                ) : (
                  <Button
                    type="submit"
                    className="md:w-1/2 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading === 'Loading...'}
                  >
                    {page === 0 ? `${isLoading}` : 'Continue'}
                  </Button>
                )}
                {showError && apiError && (
                  <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div
                      className="bg-gray-800 bg-opacity-50 fixed inset-0"
                      onClick={handleCloseError}
                    ></div>
                    <ErrorMessage error={apiError} onClose={handleCloseError} />
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

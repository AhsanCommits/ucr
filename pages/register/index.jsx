import Image from 'next/image';
import { cn } from '@/lib/utils';

import RegisterForm from '@/components/Registration/registerForm';
import CarrierData from '@/components/Registration/carrierData';
import Classification from '@/components/Registration/classification';
import FurtherClassification from '@/components/Registration/furtherClassification';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
        return (
          <RegisterForm
            page={page}
            setPage={setPage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            showError={showError}
            setShowError={setShowError}
            formData={formData}
            setFormData={setFormData}
            apiCalled={apiCalled}
            setApiCalled={setApiCalled}
            apiError={apiError}
            setApiError={setApiError}
            carrierData={carrierData}
            setCarrierData={setCarrierData}
          />
        );
      case 1:
        return (
          <CarrierData
            formDataEmail={formData.email}
            carrierData={carrierData}
            page={page}
            setPage={setPage}
          />
        );
      case 2:
        return (
          <Classification
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            apiError={apiError}
            setApiError={setApiError}
            showError={showError}
            setShowError={setShowError}
          />
        );
      default:
        return (
          <FurtherClassification
            formData={formData}
            setFormData={setFormData}
            page={page}
            setPage={setPage}
            carrierData={carrierData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setShowError={setShowError}
            setApiError={setApiError}
          />
        );
    }
  };

  return (
    <section className="section-style">
      <div className="flex-col space-y-6 container-style md:px-12 md:py-20">
        {page === 0 ? (
          <>
            <Image src={'/logo.png'} alt="Site Logo" width={146} height={146} />
            <h1 className="p-2 text-4xl font-bold text-center text-gray-700">
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
          {conditionalComponent()}
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

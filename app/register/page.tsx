'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

import RegisterForm from '@/components/registerForm';
import CarrierData from '@/components/carrierData';
import Classification from '@/components/classification';

import { useForm } from 'react-hook-form';
import { ReactNode, useState } from 'react';

const formSchema = z.object({
  usDotNumber: z.string().min(1).max(10),
  email: z.string().email(),
  terms: z.boolean().refine((val) => val === true),
  motorCarrier: z.boolean(),
  motorPrivateCarrier: z.boolean(),
  freightForwarder: z.boolean(),
  broker: z.boolean(),
  leasingCompany: z.boolean(),
});

const RegisterPage = () => {
  const [page, setPage] = useState(0);
  const [apiResponse, setApiResponse] = useState('');
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
  });

  const form = useForm<z.infer<typeof formSchema>>({
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
    },
  });

  // Submit Handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData({
      usDotNumber: values.usDotNumber,
      email: values.email,
      terms: values.terms,
      motorCarrier: values.motorCarrier,
      motorPrivateCarrier: values.motorPrivateCarrier,
      freightForwarder: values.freightForwarder,
      broker: values.broker,
      leasingCompany: values.leasingCompany,
    });

    if (!apiCalled) {
      // Check if the API hasn't been called before
      const apiUrl = `https://mobile.fmcsa.dot.gov/qc/services/carriers/${values.usDotNumber}/?webKey=304b4c98190bd95d648de8f80478c6d7f3c3af0a`;

      setApiResponse(apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCarrierData(data.content.carrier);
        console.log('API Response:', data.content.carrier);
        setApiCalled(true); // Set the state to indicate that the API has been called
        setPage(page + 1); // Navigate to the next page after successful API response
        toast({
          title: 'Registration Successful! 🎉',
          description: 'We have sent you an email with the next steps.',
        });
      } catch (error) {
        console.error('Error:', error);

        toast({
          // title: 'Error',
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Please check your US DOT number and try again.',
        });
      }
    } else {
      setPage(page + 1); // Navigate to the next page without calling the API again
    }
  }

  const { toast } = useToast();

  const conditionalComponent = (): ReactNode => {
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
        return <div>Here classification page will be added</div>;
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
                <Button
                  type="submit"
                  className="md:w-1/3 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7"
                >
                  {page === 0 ? 'Register' : 'Continue'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;

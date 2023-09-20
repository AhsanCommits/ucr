import ErrorMessage from '@/components/ErrorMessage';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { cn } from '@/lib/utils';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const formSchemaForRegistrationForm = z.object({
  usDotNumber: z.string().min(1).max(10),
  email: z.string().email(),
  terms: z.boolean().refine((val) => val === true),
});

const RegisterForm = ({
  page,
  setPage,
  isLoading,
  setIsLoading,
  showError,
  setShowError,
  formData,
  setFormData,
  apiCalled,
  setApiCalled,
  setApiError,
  apiError,
  carrierData,
  setCarrierData,
}) => {
  const registrationForm = useForm({
    resolver: zodResolver(formSchemaForRegistrationForm),
    defaultValues: {
      usDotNumber: '',
      email: '',
      terms: false,
    },
  });

  // Submit Handler.
  async function onSubmit(values) {
    setFormData({
      usDotNumber: values.usDotNumber,
      email: values.email,
      terms: values.terms,
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

        //
        if (
          data.content.carrier.totalPowerUnits === null ||
          data.content.carrier.totalPowerUnits > 1000
        ) {
          setIsLoading('Register');
          setApiError('Sorry, we cannot proceed with your request.');
          setShowError(true);

          return;
        }

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

  return (
    <Form {...registrationForm}>
      <form
        onSubmit={registrationForm.handleSubmit(onSubmit)}
        className={cn(page === 0 || page === 1 ? 'space-y-8' : 'space-y-4')}
      >
        <FormField
          control={registrationForm.control}
          name="usDotNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="DOT Number"
                  {...field}
                  className="rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email Address"
                  {...field}
                  className="rounded-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registrationForm.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <FormLabel className="">
                I agree that I have already read and accept the terms and
                conditions, privacy policy, refund policy.
              </FormLabel>
            </FormItem>
          )}
        />

        <div className={cn(page === 0 ? 'text-center' : 'text-left')}>
          {page >= 3 ? (
            <Button
              type="submit"
              disabled={(isLoading = 'Loading...')}
              className="md:w-1/3 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7"
            >
              {isLoading === 'Loading...' ? 'Loading...' : 'Pay Now'}
            </Button>
          ) : (
            <Button
              disabled={isLoading === 'Loading...'}
              type="submit"
              className="md:w-1/2 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {page === 0 ? `${isLoading}` : 'Continue'}
            </Button>
          )}
          {showError && apiError && (
            <div className="fixed inset-0 z-10 flex items-center justify-center">
              <div
                className="fixed inset-0 bg-gray-800 bg-opacity-50"
                onClick={handleCloseError}
              ></div>
              <ErrorMessage error={apiError} onClose={handleCloseError} />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;

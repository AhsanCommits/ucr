import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import ErrorMessage from '@/components/ErrorMessage';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Checkbox } from '@/components/ui/checkbox';

const formSchemaForClassification1 = z.object({
  motorCarrier: z.boolean(),
  motorPrivateCarrier: z.boolean(),
  freightForwarder: z.boolean(),
  broker: z.boolean(),
  leasingCompany: z.boolean(),
});

const Classification = ({
  formData,
  setFormData,
  apiError,
  setApiError,
  showError,
  setShowError,
  page,
  setPage,
}) => {
  const classificationForm1 = useForm({
    resolver: zodResolver(formSchemaForClassification1),
    defaultValues: {
      motorCarrier: false,
      motorPrivateCarrier: false,
      freightForwarder: false,
      broker: false,
      leasingCompany: false,
    },
  });

  const onSubmit = (values) => {
    if (
      !values.motorCarrier &&
      !values.motorPrivateCarrier &&
      !values.freightForwarder &&
      !values.broker &&
      !values.leasingCompany
    ) {
      // None of the checkboxes are selected, show an error or prevent form submission
      setApiError('Please select at least one option');
      setShowError(true); // Show an error message (you can customize this)
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      motorCarrier: values.motorCarrier,
      motorPrivateCarrier: values.motorPrivateCarrier,
      freightForwarder: values.freightForwarder,
      broker: values.broker,
      leasingCompany: values.leasingCompany,
    }));
    setPage(page + 1);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <Form {...classificationForm1}>
      <form
        onSubmit={classificationForm1.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <p className="text-lg text-gray-700">
          Carrier Classification (Check all that apply)
        </p>
        <FormField
          control={classificationForm1.control}
          name="motorCarrier"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center p-4 space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <FormLabel className="text-lg">Motor Carrier</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={classificationForm1.control}
          name="motorPrivateCarrier"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center p-4 space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <FormLabel className="text-lg">Motor Private Carrier</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={classificationForm1.control}
          name="freightForwarder"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center p-4 space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <FormLabel className="text-lg">Freight Forwarder</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={classificationForm1.control}
          name="broker"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center p-4 space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
                />
              </FormControl>
              <FormLabel className="text-lg">Broker</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={classificationForm1.control}
          name="leasingCompany"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center p-4 space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
                />
              </FormControl>

              <FormLabel className="text-lg">Leasing Company</FormLabel>
            </FormItem>
          )}
        />

        <div className="text-left">
          <Button
            type="submit"
            className="md:w-1/2 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7 "
          >
            Continue
          </Button>
        </div>

        {showError && apiError && (
          <div className="fixed inset-0 z-10 flex items-center justify-center text-center">
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-50"
              onClick={handleCloseError}
            ></div>
            <ErrorMessage error={apiError} onClose={handleCloseError} />
          </div>
        )}
      </form>
    </Form>
  );
};

export default Classification;

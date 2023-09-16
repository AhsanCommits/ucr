import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Checkbox } from '@/components/ui/checkbox';

const Classification = ({ form }) => {
  return (
    <>
      <p className="text-lg text-gray-700">
        Carrier Classification (Check all that apply)
      </p>
      <FormField
        control={form.control}
        name="motorCarrier"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
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
        control={form.control}
        name="motorPrivateCarrier"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
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
        control={form.control}
        name="freightForwarder"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
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
        control={form.control}
        name="broker"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
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
        control={form.control}
        name="leasingCompany"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
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
    </>
  );
};

export default Classification;

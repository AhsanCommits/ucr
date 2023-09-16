import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Checkbox } from '@/components/ui/checkbox';

const RegisterForm = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
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
        control={form.control}
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
        control={form.control}
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
    </>
  );
};

export default RegisterForm;

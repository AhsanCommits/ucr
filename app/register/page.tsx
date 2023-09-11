'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useForm } from 'react-hook-form';

const formSchema = z.object({
  usDotNumber: z.string().min(1).max(10),
  email: z.string().email(),
  terms: z.boolean().refine((val) => val === true),
});

const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usDotNumber: '',
      email: '',
      terms: false,
    },
  });

  // submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);

    toast({
      title: 'Registration Successful! 🎉',
      description: 'We have sent you an email with the next steps.',
    });
  }

  const { toast } = useToast();

  return (
    <section className="section-style">
      <div className="container-style flex-col md:px-12 md:py-20 space-y-6">
        <Image src={'/logo.png'} alt="Site Logo" width={146} height={146} />
        <h1 className="text-4xl font-bold text-gray-700 p-2 text-center">
          Unified Carrier Registration (UCR)
        </h1>

        <div className="w-full md:w-1/3 sm:w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
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
              <div className="text-center">
                <Button
                  type="submit"
                  className="md:w-1/3 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7"
                >
                  Register
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

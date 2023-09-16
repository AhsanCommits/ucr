import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const FurtherClassification = ({ form }) => {
  console.log(form);
  return (
    <div className="md:w-1/3 sm:w-full space-y-5">
      <FormField
        control={form.control}
        name="certificationNeeded"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={field.onChange}
              defaultValue={'Registration Year'}
            >
              <FormControl className="rounded-full">
                <SelectTrigger>
                  <SelectValue placeholder="Registration Year" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Registration Year">
                  Registration Year
                </SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="processingTime"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={field.onChange}
              defaultValue={'Would you like a certificate?'}
            >
              <FormControl className="rounded-full">
                <SelectTrigger>
                  <SelectValue placeholder="Would you like a certificate?" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Would you like a certificate?">
                  Would you like a certificate?
                </SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="registrationYear"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={field.onChange}
              defaultValue={'Processing Time'}
            >
              <FormControl className="rounded-full">
                <SelectTrigger>
                  <SelectValue placeholder="Processing Time" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Processing Time">Processing Time</SelectItem>
                <SelectItem value="Express (Same Day)">
                  Express (Same Day)
                </SelectItem>
                <SelectItem value="Regular (1-2 Business Days)">
                  Regular (1-2 Business Days)
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Who is creating the registration? (Full Name)"
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
        name="signature"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="Digital Signature (Full Name)"
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
        name="checkAuthorization"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
              />
            </FormControl>
            <FormLabel className="text-base">
              I certify I am authorized to complete this registration for the
              company.
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
};

export default FurtherClassification;

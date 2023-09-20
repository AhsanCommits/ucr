import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const createIntent = async (formData, carrierData) => {
  const intent = await fetch("/api/intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formData,
      carrierData,
    }),
  });

  const intentData = await intent.json();
  localStorage.setItem("paymentIntent", JSON.stringify(intentData));
  return intentData;
};

const formSchemaForFutherClassification = z.object({
  registrationYear: z.enum(["2023", "2024"]),
  certificationNeeded: z.enum(["Yes", "No"]),
  processingTime: z.enum(["Same day Express", "Regular"]),
  fullName: z
    .string()
    .min(1, {
      message: "Please enter your full name",
    })
    .max(25),
  signature: z
    .string()
    .min(1, {
      message: "Please enter your digital signature",
    })
    .max(50),
  checkAuthorization: z.boolean().refine((val) => val === true),
});

const FurtherClassification = ({
  page,
  setPage,
  setFormData,
  formData,
  carrierData,
  isLoading,
  setIsLoading,
  setShowError,
  setApiError,
}) => {
  const router = useRouter();

  const futherClassificationForm = useForm({
    resolver: zodResolver(formSchemaForFutherClassification),
    defaultValues: {
      certificationNeeded: "",
      processingTime: "",
      registrationYear: "",
      fullName: "",
      signature: "",
      checkAuthorization: false,
    },
  });

  async function onSubmit(values) {
    const newFormData = {
      ...formData,
      certificationNeeded: values.certificationNeeded,
      processingTime: values.processingTime,
      registrationYear: values.registrationYear,
      fullName: values.fullName,
      signature: values.signature,
      checkAuthorization: values.checkAuthorization,
    };
    setFormData((prevFormData) => newFormData);

    if (page === 3) {
      console.log("Form Data:", newFormData);
      console.log("Carrier Data:", carrierData);

      try {
        setIsLoading("Loading...");
        const intentData = await createIntent(newFormData, carrierData);
        // Redirect to the payment page
        router.push("/payment");
        setIsLoading("Continue");
      } catch (error) {
        console.error("Error:", error);
        setIsLoading("Continue");
        setApiError("Failed to create payment intent");
        setShowError(true);
      }
    }
    setPage(page + 1);
  }

  return (
    <Form {...futherClassificationForm}>
      <form
        onSubmit={futherClassificationForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="space-y-5 md:w-1/2 sm:w-full">
          <FormField
            control={futherClassificationForm.control}
            name="registrationYear"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={"Registration Year"}
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
            control={futherClassificationForm.control}
            name="certificationNeeded"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={"Would you like a certificate?"}
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
            control={futherClassificationForm.control}
            name="processingTime"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={"Processing Time"}
                >
                  <FormControl className="rounded-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Processing Time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Processing Time">
                      Processing Time
                    </SelectItem>
                    <SelectItem value="Same day Express">
                      Express (Same Day)
                    </SelectItem>
                    <SelectItem value="Regular">
                      Regular (1-2 Business Days)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={futherClassificationForm.control}
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
            control={futherClassificationForm.control}
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
            control={futherClassificationForm.control}
            name="checkAuthorization"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center p-4 space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-8 w-8 rounded-full shadow data-[state=checked]:bg-[#004990] data-[state=checked]:text-primary-foreground"
                  />
                </FormControl>

                <FormLabel className="text-base">
                  I certify I am authorized to complete this registration for
                  the company.
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="text-left">
            <Button
              disabled={isLoading === "Loading..."}
              type="submit"
              className="md:w-1/2 w-full rounded-full bg-[#004990] hover:bg-[#003972] hover:scale-110 transition-all px-8 py-7 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading === "Loading..." ? `${isLoading}` : "Continue"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FurtherClassification;

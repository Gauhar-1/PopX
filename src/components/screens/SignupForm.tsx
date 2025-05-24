
"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Circle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const signupFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  companyName: z.string().optional(),
  isAgency: z.enum(["yes", "no"], { required_error: "Please select if you are an agency." }),
});

type SignupFormData = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "Marry Doe", // Default placeholder value
      phoneNumber: "",
      email: "",
      password: "",
      companyName: "",
      isAgency: "yes", // Default to "Yes" selected
    },
  });

  async function onSubmit(values: SignupFormData) {
    setIsSubmitting(true);
    console.log("Signup form submitted:", values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Account Created!",
      description: "Your PopX account has been successfully created.",
    });
    
    // Pass name and email to settings page
    const queryParams = new URLSearchParams({
      name: values.fullName,
      email: values.email,
    }).toString();

    form.reset(); // Reset after getting values for queryParams
    setIsSubmitting(false);
    router.push(`/settings?${queryParams}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-popx-bg p-4"> {/* Changed min-h-screen to min-h-full */}
      <Card className="w-full max-w-[380px] bg-popx-white rounded-lg shadow-xl p-5 sm:p-7">
        <CardHeader className="p-0">
          <CardTitle className="font-inter font-semibold text-[24px] text-popx-heading mb-6 text-left">
            Create your PopX account
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput label="Full Name *" {...field} />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput label="Phone number *" type="tel" {...field} />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput label="Email address *" type="email" {...field} />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput label="Password *" type="password" {...field} />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput label="Company name" {...field} />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAgency"
                render={({ field }) => (
                  <FormItem className="space-y-2 pt-2">
                    <FormLabel className="font-inter text-popx-heading text-[14px]">Are you an Agency? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-6 items-center"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="yes" id="agencyYes" className="popx-radio-item">
                              <div className="popx-radio-indicator">
                                {field.value === "yes" && <div className="popx-radio-indicator-circle" />}
                              </div>
                            </RadioGroupItem>
                          </FormControl>
                          <FormLabel htmlFor="agencyYes" className="font-inter text-[14px] text-popx-heading font-normal cursor-pointer">
                            Yes
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                             <RadioGroupItem value="no" id="agencyNo" className="popx-radio-item">
                              <div className="popx-radio-indicator">
                                {field.value === "no" && <div className="popx-radio-indicator-circle" />}
                              </div>
                            </RadioGroupItem>
                          </FormControl>
                          <FormLabel htmlFor="agencyNo" className="font-inter text-[14px] text-popx-heading font-normal cursor-pointer">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-[48px] rounded-md bg-popx-primary text-popx-white font-inter font-medium text-[16px] mt-4 shadow-sm hover:bg-popx-primary-hover disabled:bg-popx-gray disabled:text-popx-gray-disabled-text"
                disabled={isSubmitting || !form.formState.isValid}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
       <p className="mt-4 text-sm text-popx-paragraph">
        Already have an account?{' '}
        <Link href="/signin" className="text-popx-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}


"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { findEmailDomain } from "@/ai/flows/email-domain-finder";

// Define Zod schema for form validation
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  isAgency: z.enum(["yes", "no"], { required_error: "You must select an option." }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAiLoading, setIsAiLoading] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      companyName: "",
      isAgency: undefined,
    },
  });

  const handleCompanyBlur = async () => {
    const companyName = form.getValues("companyName");
    const currentEmail = form.getValues("email");
    
    const companyNameValid = await form.trigger("companyName");

    if (companyName && companyNameValid && (!currentEmail || !currentEmail.includes('@'))) {
      setIsAiLoading(true);
      try {
        const result = await findEmailDomain({ companyName });
        if (result && result.emailDomain) {
          const usernamePart = currentEmail.split('@')[0] || form.getValues("fullName").split(" ")[0]?.toLowerCase() || "user";
          form.setValue("email", `${usernamePart}@${result.emailDomain}`, { shouldValidate: true });
          toast({
            title: "AI Suggestion",
            description: `Email domain updated to @${result.emailDomain}. Please complete the username if needed.`,
          });
        }
      } catch (error) {
        console.error("AI email domain finder error:", error);
      } finally {
        setIsAiLoading(false);
      }
    }
  };

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    console.log("Form submitted:", values);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Notification: New account created for", values.email);

    toast({
      title: "Account Created!",
      description: "Your account has been successfully created. A notification has been sent.",
    });
    form.reset();
    setIsSubmitting(false);
  }

  const labelClassName = "absolute left-3 top-3 -translate-y-1/2 scale-75 origin-[0%_0%] bg-card px-1 text-muted-foreground pointer-events-none transition-colors duration-200 transform-gpu peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-primary";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-lg shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">Create Account</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Fill in the details below to create your FormFlow account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input placeholder=" " {...field} className="peer pt-5" />
                    </FormControl>
                    <FormLabel className={labelClassName}>
                      Full Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input type="tel" placeholder=" " {...field} className="peer pt-5" />
                    </FormControl>
                    <FormLabel className={labelClassName}>Phone Number <span className="text-destructive">*</span></FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input type="email" placeholder=" " {...field} className="peer pt-5" />
                    </FormControl>
                    <FormLabel className={labelClassName}>Email Address <span className="text-destructive">*</span></FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input type="password" placeholder=" " {...field} className="peer pt-5" />
                    </FormControl>
                    <FormLabel className={labelClassName}>Password <span className="text-destructive">*</span></FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input placeholder=" " {...field} onBlur={handleCompanyBlur} className="peer pt-5" />
                    </FormControl>
                    <FormLabel className={labelClassName}>
                      Company Name <span className="text-destructive">*</span>
                      {isAiLoading && <Loader2 className="ml-1 inline h-4 w-4 animate-spin" />}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAgency"
                render={({ field }) => (
                  <FormItem className="space-y-3 pt-2"> {/* Added pt-2 for better spacing with floating labels above */}
                    <FormLabel>Are you an Agency? <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting || isAiLoading}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-center text-xs text-muted-foreground pt-4">
          <p>Fields marked with <span className="text-destructive">*</span> are required.</p>
        </CardFooter>
      </Card>
    </main>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const signinFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Min 1 for simplicity, PRD implies just filled
});

type SigninFormData = z.infer<typeof signinFormSchema>;

export default function SigninForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // To update isValid state for button enabling
  });

  async function onSubmit(values: SigninFormData) {
    setIsSubmitting(true);
    console.log("Signin form submitted:", values);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate successful login for now
    if (values.email === "user@example.com" && values.password === "password") {
        toast({
        title: "Login Successful!",
        description: "Welcome back to PopX.",
        });
        form.reset();
        router.push('/settings'); // Redirect to account settings page
    } else {
        toast({
            title: "Login Failed",
            description: "Invalid email or password.",
            variant: "destructive",
        });
    }
    setIsSubmitting(false);
  }
  
  const canSubmit = form.formState.isValid;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-popx-bg p-4">
      <Card className="w-full max-w-[380px] bg-popx-white rounded-lg shadow-xl p-5 sm:p-7">
        <CardHeader className="p-0 mb-6 text-left">
          <CardTitle className="font-inter font-semibold text-[24px] text-popx-heading mb-1">
            Signin to your PopX account
          </CardTitle>
          <CardDescription className="font-inter text-[14px] text-popx-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput 
                      label="Email Address" 
                      type="email" 
                      placeholder="Enter email address" // Will be visually replaced by label
                      {...field} 
                    />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FloatingLabelInput 
                      label="Password" 
                      type="password" 
                      placeholder="Enter password" // Will be visually replaced by label
                      {...field} 
                    />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-[44px] rounded-md font-inter font-medium text-[16px] mt-2 shadow-sm"
                disabled={isSubmitting || !canSubmit}
                style={{
                  backgroundColor: canSubmit ? '#7C3AED' : '#D1D5DB',
                  color: canSubmit ? '#FFFFFF' : '#F9FAFB',
                }}
              >
                {isSubmitting ? "Logging In..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm text-popx-paragraph">
        Don't have an account?{' '}
        <Link href="/signup" className="text-popx-primary hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}

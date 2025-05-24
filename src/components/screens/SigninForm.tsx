
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
import { cn } from "@/lib/utils";

const signinFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter." })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter." })
    .regex(/[0-9]/, { message: "Password must include a number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must include a special character." }),
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
    mode: "onChange",
  });

  async function onSubmit(values: SigninFormData) {
    setIsSubmitting(true);
    console.log("Signin form submitted:", values);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Since password validation is now handled by Zod,
    // we only need to check the email for this prototype's login success.
    if (values.email === "user@example.com") {
        toast({
        title: "Login Successful!",
        description: "Welcome back to PopX.",
        });
        form.reset();
        router.push('/settings');
    } else {
        toast({
            title: "Login Failed",
            description: "Invalid email or password.", // Generic message for prototype
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
                      {...field}
                    />
                    <FormMessage className="text-red-500 text-xs pt-1" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={cn(
                  "w-full h-[44px] rounded-md font-inter font-medium text-[16px] mt-2 shadow-sm",
                  canSubmit ? "bg-popx-primary text-popx-white hover:bg-popx-primary-hover" : "bg-popx-gray-light-disabled text-popx-bg cursor-not-allowed"
                )}
                disabled={isSubmitting || !canSubmit}
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

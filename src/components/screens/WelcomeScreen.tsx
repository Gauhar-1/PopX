
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col justify-end min-h-full bg-popx-bg p-6 pb-10 sm:p-8 sm:pb-12"> {/* Changed min-h-screen to min-h-full */}
      <div className="w-full max-w-md mx-auto">
        <h1 className="font-inter font-semibold text-[24px] leading-tight text-popx-heading">
          Welcome to PopX
        </h1>
        <p className="font-inter text-[14px] text-popx-paragraph mt-3 sm:mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
        <Link href="/signup" passHref legacyBehavior>
          <Button
            asChild
            className="w-full h-[44px] rounded-md bg-popx-primary text-popx-white font-inter font-medium text-[16px] mt-8 shadow-sm hover:bg-popx-primary-hover"
          >
            <a>Create Account</a>
          </Button>
        </Link>
        <Link href="/signin" passHref legacyBehavior>
          <Button
            asChild
            className="w-full h-[44px] rounded-md bg-popx-secondary text-popx-secondary-text font-inter font-medium text-[16px] mt-3 shadow-sm hover:bg-opacity-90"
          >
            <a>Already Registered? Login</a>
          </Button>
        </Link>
      </div>
    </div>
  );
}


"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MobileViewportProps {
  children: React.ReactNode;
}

export default function MobileViewport({ children }: MobileViewportProps) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing or a loading skeleton on the server/initial client render
    // to avoid flash of unstyled content or layout shifts.
    return null; 
  }

  if (isMobile) {
    // On actual mobile devices, let the content fill the screen naturally
    return <>{children}</>;
  }

  // On desktop, constrain to a mobile-like viewport
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-6 md:p-8">
      <div className={cn(
        "w-full max-w-[400px] rounded-2xl bg-popx-bg shadow-2xl",
        "h-[calc(100vh-4rem)] max-h-[750px] min-h-[600px]", // Responsive height with clamps
        "overflow-hidden flex flex-col" // Added flex flex-col
      )}>
        <div className="flex-grow overflow-y-auto"> {/* Scrollable content area */}
          {children}
        </div>
      </div>
    </div>
  );
}

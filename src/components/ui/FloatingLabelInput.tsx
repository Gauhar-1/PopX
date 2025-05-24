
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FloatingLabelInputProps extends InputProps {
  label: string;
  name: string; // Important for react-hook-form
  labelClassName?: string;
  wrapperClassName?: string;
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    { label, name, id, type, value, onChange, onBlur, placeholder, className, labelClassName, wrapperClassName, ...props },
    ref
  ) => {
    const internalId = id || name;
    const [hasValue, setHasValue] = React.useState(!!value);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // Original onFocus logic can be called here if needed from props.onFocus
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e); // Call original onBlur
      }
    };
    
    React.useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    return (
      <div className={cn("relative", wrapperClassName)}>
        <Input
          type={type}
          id={internalId}
          name={name}
          ref={ref}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder || " "} 
          className={cn(
            "peer h-[44px] w-full rounded-md border-1.5 border-popx-gray bg-popx-white px-3 pt-4 pb-1 text-popx-heading placeholder-transparent focus:outline-none focus:border-popx-primary focus:ring-1 focus:ring-popx-primary",
            className
          )}
          {...props}
        />
        <Label
          htmlFor={internalId}
          className={cn(
            "absolute font-inter transition-colors duration-200 ease-out origin-[0] pointer-events-none",
            "top-[-0.7rem]", 
            "left-2",       
            "text-[13px]",   
            "px-2",          
            "bg-popx-white",  
            // Conditional color:
            (isFocused || hasValue) ? "text-popx-label" : "text-popx-paragraph",
            
            labelClassName
          )}
        >
          {label}
        </Label>
      </div>
    );
  }
);
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };

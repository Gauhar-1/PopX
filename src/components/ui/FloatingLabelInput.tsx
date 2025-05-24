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
    const [hasValue, setHasValue] = React.useState(!!value); // For initial value
    const [isFocused, setIsFocused] = React.useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onBlur) { // Prop name is onBlur, but this is focus
        // Call original onFocus if provided
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (onBlur) {
        onBlur(e); // Call original onBlur
      }
    };
    
    // Update hasValue if the external value prop changes
    React.useEffect(() => {
      setHasValue(!!value);
    }, [value]);


    // PRD: "Label: Inter 400 13 px, color #8B5CF6; on focus or non-empty move to 12 px above field, scale 0.75."
    // This means the label starts inside. Input height 44px.
    // The label should float above the input border. The input needs padding-top to not overlap with the text.
    // A common way is `pt-[calc(1em+0.5rem)]` or similar for the input.
    // And the label is positioned absolutely.
    // For "12px above field" and "scale 0.75", we can use transform.

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
          placeholder={placeholder || " "} // Crucial: must have a placeholder (even a space) for :placeholder-shown to work
          className={cn(
            "peer h-[44px] w-full rounded-md border-1.5 border-popx-gray bg-popx-white px-3 pt-4 pb-1 text-popx-heading placeholder-transparent focus:outline-none focus:border-popx-primary focus:ring-1 focus:ring-popx-primary",
            className
          )}
          {...props}
        />
        <Label
          htmlFor={internalId}
          className={cn(
            "absolute left-3 font-inter transition-all duration-200 ease-out origin-[0] pointer-events-none",
            "text-popx-paragraph text-base", // Initial state (like placeholder)
            (isFocused || hasValue)
              ? "top-[0.375rem] transform scale-[0.825] -translate-y-0 text-popx-label text-[13px]" // Floated state (13px font from PRD, scale to make it effectively smaller)
              : "top-1/2 -translate-y-1/2", // Centered state
            isFocused && "text-popx-label",
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

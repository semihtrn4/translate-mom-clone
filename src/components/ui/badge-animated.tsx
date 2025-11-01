
import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeAnimatedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "gradient";
  animation?: "pulse" | "float" | "none";
}

export function BadgeAnimated({
  children,
  variant = "default",
  animation = "pulse",
  className,
  ...props
}: BadgeAnimatedProps) {
  const animationClass = {
    pulse: "animate-pulse-subtle",
    float: "animate-float",
    none: "",
  };

  const variantClass = {
    default: "bg-brand-orange text-white",
    outline: "bg-transparent border border-brand-orange text-brand-orange",
    gradient: "bg-gradient-to-r from-brand-orange to-brand-red text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full",
        variantClass[variant],
        animationClass[animation],
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

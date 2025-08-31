import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  tabIndex?: number;
  href?: string;
  target?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  onKeyDown,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  tabIndex,
  href,
  target,
}: ButtonProps) {
  const baseClasses =
    "cursor-pointer inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2";

  const sizeClasses = {
    sm: "h-6 px-6 py-2 text-sm",
    md: "h-7 px-6 py-2 text-lg",
    lg: "h-8 px-8 py-3 text-base",
  };

  const variantClasses = {
    primary:
      "bg-black text-white hover:bg-neutral-800 focus:ring-white/50 active:bg-neutral-900",
    secondary:
      "border border-black text-black bg-transparent hover:bg-black hover:text-white focus:ring-black/50",
    white: "bg-white text-black hover:bg-white/50 focus:ring-white/50",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  const Tag = href ? "a" : "button";

  return (
    <Tag
      type={type}
      className={classes}
      href={href}
      target={target}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      tabIndex={tabIndex}
    >
      {children}
    </Tag>
  );
}

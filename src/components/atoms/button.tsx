import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  type,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={twMerge(
        "p-2 rounded-md bg-primary text-bright font-highlight-accent disabled:opacity-50 disabled:cursor-none hover:bg-primary/90 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

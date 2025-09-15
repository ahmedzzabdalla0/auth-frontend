import { twMerge } from "tailwind-merge";

export default function Label({
  children,
  className = "",
  htmlFor,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        "block font-content-accent text-secondary mb-3",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

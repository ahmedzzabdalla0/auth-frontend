import { twMerge } from "tailwind-merge";

export default function Input({
  className = "",
  error,
  ...props
}: {
  className?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <input
        className={twMerge(
          "p-3 border border-stroke rounded-m text-type w-full",
          className,
          error && "border-error"
        )}
        {...props}
      />
      {error && <p className="text-error">{error}</p>}
    </>
  );
}

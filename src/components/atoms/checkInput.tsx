import { twMerge } from "tailwind-merge";

interface CheckInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function CheckInput({
  label,
  className,
  ...props
}: CheckInputProps) {
  return (
    <label
      className={twMerge(
        "flex items-center space-x-2 select-none cursor-pointer w-fit",
        className
      )}
    >
      <input
        type="checkbox"
        {...props}
        className="form-checkbox h-0 w-0 opacity-0 text-primary peer"
      />
      <span className="bg-bright border border-stroke w-4.5 h-4.5 rounded-md inline-block mr-2 peer-checked:[&>.checkmark]:opacity-100 relative">
        <span className="checkmark border-primary opacity-0 transition-opacity"></span>
      </span>
      <span className="text-secondary">{label}</span>
    </label>
  );
}

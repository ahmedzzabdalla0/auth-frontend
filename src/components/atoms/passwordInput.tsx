import { useState, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function PasswordInput({
  className = "",
  onChange = () => {},
  error,
  ...props
}: PasswordInputProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length && isEmpty) {
      setIsEmpty(false);
    } else if (!e.target.value.length && !isEmpty) {
      setIsEmpty(true);
    }
    onChange(e);
  };
  return (
    <>
      <label
        className={twMerge(
          "border border-stroke rounded-m w-full relative block",
          error && "border-error"
        )}
      >
        <input
          type={!isVisible ? "password" : "text"}
          className={twMerge("p-3 text-type w-full", className)}
          onChange={onChangeHandler}
          {...props}
        />
        {!isEmpty && (
          <button
            type="button"
            className="text-sm text-typo select-none ml-2 absolute right-2.5 top-1/2 -translate-y-1/2"
            onClick={() => setIsVisible((x) => !x)}
          >
            {!isVisible ? (
              <IoMdEye className="icon-md" />
            ) : (
              <IoMdEyeOff className="icon-md" />
            )}
          </button>
        )}
      </label>
      {error && <p className="text-error">{error}</p>}
    </>
  );
}

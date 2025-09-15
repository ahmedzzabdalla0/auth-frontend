import Input from "@/components/atoms/input";
import { twMerge } from "tailwind-merge";
import Label from "@/components/atoms/label";
import PasswordInput from "@/components/atoms/passwordInput";
import Button from "@/components/atoms/button";
import CheckInput from "@/components/atoms/checkInput";
import { Link } from "react-router";
import { useAuthForm } from "@/hooks/useAuthForm";
import type { SignupForm, LoginForm } from "@/constants/types";

interface AuthFormProps {
  title: string;
  formId: "login" | "signup";
  className?: string;
}

export default function AuthForm({
  title,
  formId = "login",
  className = "",
}: AuthFormProps) {
  const { state, handleChange, handleSubmit } = useAuthForm(formId);

  // Type-safe form accessors
  const loginForm = state.form as LoginForm;
  const signupForm = state.form as SignupForm;

  return (
    <section
      className={twMerge(
        "mx-5 md:mx-auto lg:max-w-[500px] bg-bright py-4 px-7 rounded-m border border-secondary space-y-5",
        className
      )}
    >
      <h2 className="font-heading-5">{title}</h2>

      {/* Account link section */}
      <p className="font-highlight-accent text-secondary">
        {formId === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Link
          to={formId === "login" ? "/signup" : "/"}
          className="underline text-primary inline-block cursor-pointer font-medium ml-1"
        >
          {formId === "login" ? "Create now" : "Log in"}
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email field */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={state.form.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            error={state.errors.email}
          />
        </div>

        {/* Name field - signup only */}
        {formId === "signup" && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              value={signupForm.name}
              error={state.errors.name}
              onChange={handleChange}
              placeholder="Ahmed Mohamed"
            />
          </div>
        )}

        {/* Password field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            name="password"
            value={state.form.password}
            onChange={handleChange}
            placeholder="Password"
            error={state.errors.password}
          />
        </div>

        {/* Repeat password - signup only */}
        {formId === "signup" && (
          <div>
            <Label htmlFor="repassword">Repeat Password</Label>
            <PasswordInput
              name="repassword"
              value={signupForm.repassword}
              onChange={handleChange}
              placeholder="Repeat Password"
              error={state.errors.repassword}
            />
          </div>
        )}

        {/* Remember me checkbox - login only */}
        {formId === "login" && (
          <div>
            <CheckInput
              label="Remember me"
              name="rememberMe"
              checked={loginForm.rememberMe}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Submit button */}
        <Button type="submit" className="mt-4" disabled={state.isSubmitting}>
          {state.isSubmitting
            ? formId === "login"
              ? "Logging in..."
              : "Signing up..."
            : formId === "login"
            ? "Log in"
            : "Sign up"}
        </Button>
      </form>
    </section>
  );
}

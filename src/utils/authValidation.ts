import type { FormType, SignupForm } from "@/constants/types";

export const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password: string): boolean =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(
    password
  );

export const validateForm = (
  form: FormType,
  formId: "login" | "signup"
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Email validation
  if (!validateEmail(form.email)) {
    errors.email = !form.email ? "Email is required" : "Invalid email format";
  }

  if (formId === "login") {
    // Login-specific validation
    if (!form.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(form.password)) {
      errors.password = "Invalid password";
    }
  } else {
    // Signup-specific validation
    const signupForm = form as SignupForm;

    if (!signupForm.name || signupForm.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!validatePassword(signupForm.password)) {
      errors.password =
        "Password must be at least 8 chars, include a letter, number, and special char";
    }

    if (signupForm.password !== signupForm.repassword) {
      errors.repassword = !signupForm.repassword
        ? "Please repeat your password"
        : "Passwords do not match";
    }
  }

  return errors;
};

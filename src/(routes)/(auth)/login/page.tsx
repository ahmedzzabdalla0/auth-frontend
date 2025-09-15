import AuthForm from "@/components/organisms/authForm";

export default function LoginPage() {
  return (
    <div className="w-screen">
      <AuthForm formId="login" title="Log in" />
    </div>
  );
}

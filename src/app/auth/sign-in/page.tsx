import { SignInForm } from "@/components/civitas/sign-in-form";
import { AppHeader } from "@/components/civitas/header";

export default function SignInPage() {
  return (
    <>
      <AppHeader />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <SignInForm />
      </div>
    </>
  );
}

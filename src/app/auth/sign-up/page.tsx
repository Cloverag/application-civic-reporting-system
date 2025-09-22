import { SignUpForm } from "@/components/civitas/sign-up-form";
import { AppHeader } from "@/components/civitas/header";

export default function SignUpPage() {
  return (
    <>
        <AppHeader />
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <SignUpForm />
        </div>
    </>
  );
}

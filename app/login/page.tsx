import { LoginForm } from "@/components/LoginForm";

export type User = {
  id: string;
  username: string;
};

export default async function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-5">
      <img src="" alt="hero" />
      <div className="flex flex-col justify-center items-center w-full gap-2 mb-5">
        <h1 className="font-extrabold text-2xl w-5/6">Welcome to Rupaye</h1>
        <p className="w-5/6 font-light text-black-100/25">
          Manage your Family Budget at ease.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
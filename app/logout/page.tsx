"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function LogoutPage() {
  const router = useRouter();
  const ignoreRef = useRef(false);

  useEffect(() => {
    async function logout() {
      const response = await fetch("http://localhost:3000/api/auth/logout");
      const data = await response.json();
      const { message, authorize } = data;
      if (authorize === false) {
        ignoreRef.current = true;
        toast("You are logged out successfully!", {
          description: "Success",
        });
        router.replace("/login");
      }
    }

    if (ignoreRef.current === false) {
      logout();
    }

    return () => {
      ignoreRef.current === true;
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <p>Logging out ...</p>
    </div>
  );
}

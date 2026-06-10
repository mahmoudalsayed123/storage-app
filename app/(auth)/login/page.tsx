"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const handleLogin = async () => {
    const supabase = supabaseBrowser();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <button
        onClick={handleLogin}
        className="w-fit border-2 border-gray-200 m-auto px-4 py-3 rounded-md flex items-center justify-center gap-2 cursor-pointer"
      >
        <Image
          src="/assets/icons/google.svg"
          alt="google"
          width={20}
          height={20}
        />
        <span className="text-[16px] font-medium">Login With Google</span>
      </button>
    </main>
  );
};

export default Login;

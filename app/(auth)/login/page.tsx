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
      <div className="border-2 border-gray-200 p-5 rounded-md text-center w-fit">
        <h1 className="text-2xl font-bold mb-5">Login To Storage App</h1>
        <button
          onClick={handleLogin}
          className="w-full border-2 border-gray-200 m-auto p-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="text-[16px] font-medium me-2">
            Login With Google
          </span>
          <span>
            <Image
              src="/assets/images/google.svg"
              alt="google"
              width={20}
              height={20}
            />
          </span>
        </button>
        <hr className="w-[75%] h-[1.7px] bg-black mx-auto my-6 " />
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            className="w-fit outline-none border-2 border-gray-200 p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-fit outline-none border-2 border-gray-200 p-2 rounded-md "
          />
          <Link
            href="/"
            className="bg-black text-white p-2 rounded-md cursor-pointer"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;

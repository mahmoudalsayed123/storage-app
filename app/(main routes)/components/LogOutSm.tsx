"use client";
import { UserRow } from "@/app/constants";
import { handleError } from "@/app/help/fileUtils";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Image from "next/image";
import { redirect } from "next/navigation";

const LogOutSm = ({ user }: { user: UserRow }) => {
  // Logout User from Supabase Auth
  async function logoutUser() {
    const supabase = await supabaseBrowser();

    const { error } = await supabase.auth.signOut();
    const { error: deleteError } = await supabase
      .from("users")
      .delete()
      .eq("email", user?.email);

    if (deleteError) {
      handleError(deleteError.message);
    }
    if (error) {
      handleError(error.message);
    }

    redirect("/login");
  }

  return (
    <button
      onClick={logoutUser}
      className="w-full bg-black flex justify-center items-center gap-2 shadow_xl p-2 rounded-full cursor-pointer"
    >
      <Image
        src="/assets/icons/logout.svg"
        alt="upload"
        width={20}
        height={20}
      />
      <p className="font-bold">LogOut</p>
    </button>
  );
};

export default LogOutSm;

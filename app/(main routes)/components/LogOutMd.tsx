"use client";
import { UserRow } from "@/app/constants";
import { handleError } from "@/app/help/fileUtils";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Image from "next/image";
import { redirect } from "next/navigation";

const LogOutMd = ({ user }: { user: UserRow }) => {
  // // Delete User From Database
  // async function deleteUserFromDB(user: User | null) {
  //   const supabase = await supabaseBrowser();

  //   const { error } = await supabase
  //     .from("users")
  //     .delete()
  //     .eq("email", user?.user_metadata.email);

  //   if (error) {
  //     handleError(error.message);
  //   }
  // }
  // Logout User from Supabase Auth
  async function logoutUser() {
    const supabase = await supabaseBrowser();

    const { error } = await supabase.auth.signOut();
    if (error) {
      handleError(error.message);
    }

    redirect("/login");
  }
  return (
    <button
      onClick={logoutUser}
      className="shadow_xl md:px-3 lg:px-5 py-2 rounded-full bg-black cursor-pointer"
    >
      <Image
        src="/assets/icons/logout.svg"
        alt="logout"
        width={20}
        height={20}
      />
    </button>
  );
};

export default LogOutMd;

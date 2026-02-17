import { supabaseServer } from "@/lib/supabase/server";
import { handleError } from "../help/fileUtils";
import { UserRow } from "../constants";
import { redirect } from "next/navigation";

// Get User From Supabase Auth
export async function getUser() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    handleError(error.message);
  }

  return data.user;
}

// Create User From Database
export async function createUserFromDB() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const supabase = await supabaseServer();

  const userData: UserRow = {
    auth_user_id: user.id,
    storage_used: 0,
    name: user?.user_metadata.full_name,
    email: user?.user_metadata.email,
    avatar: user?.user_metadata.avatar_url,
  };

  const { data: existingUser, error: exitError } = await supabase
    .from("users")
    .select("*")
    .eq("email", user?.user_metadata.email);

  if (exitError) {
    handleError(exitError.message);
  }

  if (!existingUser || existingUser.length === 0) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([userData])
      .single();

    if (insertError) {
      handleError(insertError.message);
    }
  }
  return existingUser;
}

// Get User From Database
export async function getUserFromDB(): Promise<UserRow[]> {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", user?.user_metadata.email);

  if (error) {
    handleError(error.message);
  }

  return data ?? [];
}

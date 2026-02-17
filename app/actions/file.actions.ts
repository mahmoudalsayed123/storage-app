"use server";
import { supabaseServer } from "@/lib/supabase/server";
import { handleError } from "../help/fileUtils";
import { getUserFromDB } from "./user.actions";

export async function getFilesFromDBForCurrentUser(email: string) {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("users")
    .select("files(*)")
    .eq("email", email);
  if (error) handleError(error.message);
  return data?.[0]?.files;
}

export async function getSearchFile(fileName = "") {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("name", fileName);
  if (error) handleError(error.message);
  return data;
}

export async function getSpecificeFiles(mimeType: string) {
  const users = await getUserFromDB();
  const user = users?.[0];

  if (!user) return;
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("user_id", user?.id)
    .eq("mimeType", mimeType);
  if (error) handleError(error.message);
  console.log("files", data);
  return data;
}

export async function updateFileName(
  id: string,
  name: string,
  extension: string,
) {
  const supabase = await supabaseServer();
  const newName = `${name}.${extension}`;

  const { error } = await supabase
    .from("files")
    .update({ name: newName })
    .eq("id", id);

  if (error) handleError(error.message);

  return true;
}

export async function getFile(nameFile = "") {
  const supabase = await supabaseServer();
  let query = supabase.from("files").select("*");
  if (nameFile) query = query.ilike("name", `%${nameFile}%`);
  const { data, error } = await query;
  if (error) handleError(error.message);
  return data;
}

import { supabaseBrowser } from "@/lib/supabase/browser";
import {
  extractFileNameFromSupabaseUrl,
  getFileExtension,
  getFileMainType,
  getStorageStats,
  handleError,
  sanitizeFileName,
} from "../help/fileUtils";
import { quota } from "../constants";

const SUPABASE_URL = "https://bwxhaxrylseeeagurvpu.supabase.co";

// Upload File To Supabase Storage
export const uploadFile = async (file: File) => {
  const bucket = "files";
  if (!file) throw new Error("No file");

  const supabase = await supabaseBrowser();

  const name = sanitizeFileName(file.name);

  const fileName = `${crypto.randomUUID()}-${name}`;

  const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) handleError(error.message);

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
};

export async function updateStorageUsed(fileSize: number) {
  if (!fileSize || fileSize <= 0) return null;

  const supabase = supabaseBrowser();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data: dbUser, error } = await supabase
    .from("users")
    .select("storage_used")
    .eq("email", user.email)
    .single();

  if (error || !dbUser) {
    throw new Error("User not found");
  }

  const newStorageUsed = dbUser.storage_used + fileSize;

  const availableStorage =
    getStorageStats(newStorageUsed).availableGB.toFixed(2);

  if (Number(availableStorage) > quota) {
    handleError("Storage quota exceeded");
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ storage_used: newStorageUsed })
    .eq("email", user.email);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return newStorageUsed;
}

// Add File To Database
export const addFileToDB = async (file: File, path: string) => {
  const supabase = await supabaseBrowser();

  const { data } = await supabase.auth.getUser();

  if (!data.user) return;

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("email", data?.user?.email)
    .single();

  const fileDoc = {
    name: file.name,
    size: file.size,
    extension: getFileExtension(file.name),
    mimeType: getFileMainType(file.type),
    storage_path: path,
    user_id: user?.id,
  };

  const { error } = await supabase.from("files").insert(fileDoc);

  if (error) handleError(error.message);

  return fileDoc;
};

export async function getPublicURL(url: string) {
  const supabase = supabaseBrowser();
  const { data } = supabase.storage
    .from("files")
    .getPublicUrl(extractFileNameFromSupabaseUrl(url));
  const imageUrl = data.publicUrl;
  return imageUrl;
}

export async function getDownloadURL(url: string) {
  const supabase = supabaseBrowser();
  const fileName = extractFileNameFromSupabaseUrl(url);
  const { data, error } = await supabase.storage
    .from("files")
    .download(fileName);

  if (error) {
    console.error("Error downloading file:", error);
  }

  const path = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = path;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(path);
  return data;
}

export async function deleteFile(url: string, id: string) {
  const supabase = supabaseBrowser();
  const fileName = extractFileNameFromSupabaseUrl(url);
  const { error } = await supabase.storage.from("files").remove([fileName]);

  const { error: deleteError } = await supabase
    .from("files")
    .delete()
    .eq("id", id);
  if (deleteError) handleError(deleteError.message);

  if (error) handleError(error.message);
  return true;
}

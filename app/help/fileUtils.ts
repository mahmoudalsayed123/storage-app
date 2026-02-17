import { FileDocument } from "../constants";

export function handleError(message: string) {
  console.error(message);
  throw new Error(message);
}

export function sanitizeFileName(fileName: string) {
  return fileName
    .normalize("NFD") // يفصل الحروف عن التشكيل
    .replace(/[\u0300-\u036f]/g, "") // يشيل التشكيل
    .replace(/[^\w.-]/g, "_") // يشيل أي حاجة غير آمنة
    .replace(/_+/g, "_") // يمنع ____
    .toLowerCase();
}

export function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

export function detectFileType(extension: string) {
  if (["png", "jpg", "jpeg", "svg", "webp"].includes(extension)) return "image";
  if (["mp4", "mkv", "avi"].includes(extension)) return "video";
  if (["mp3", "wav"].includes(extension)) return "audio";
  if (["pdf", "docx", "pptx"].includes(extension)) return "document";
  if (["zip", "rar"].includes(extension)) return "archive";
  return "other";
}

export function getFileIcon(extension: string) {
  const icons: Record<string, string> = {
    // Images
    png: "/assets/image/png.svg",
    jpg: "/assets/image/jpg.svg",
    jpeg: "/assets/image/jpg.svg",
    svg: "/assets/image/svg.svg",
    webp: "/assets/image/webp.svg",

    // Videos
    mp4: "/assets/video/mp4.svg",
    mkv: "/assets/video/mkv.svg",
    avi: "/assets/video/avi.svg",

    // Audio
    mp3: "/assets/audio/mp3.svg",
    wav: "/assets/audio/wav.svg",

    // Documents
    pdf: "/assets/document/pdf.svg",
    docx: "/assets/document/docx.svg",
    pptx: "/assets/document/pptx.svg",

    // Other
    zip: "/assets/archive/zip.svg",
  };

  return icons[extension] || "/assets/other/other.svg";
}

export function getFileMainType(mimeType: string): string {
  if (!mimeType) return "unknown";

  return mimeType.split("/")[0];
}

export function getFileExtensionFromMime(mimeType?: string | null): string {
  if (!mimeType || !mimeType.includes("/")) return "";

  return mimeType.split("/")[1];
}

export function getFirstName(fullName?: string): string {
  if (!fullName) return "";
  return fullName.trim().split(/\s+/)[0];
}

export function getStorageStats(storage_used: number) {
  const QUOTA_BYTES = 2 * 1024 * 1024 * 1024;

  const availableBytes = Math.max(QUOTA_BYTES - storage_used, 0);
  const usedPercent = (storage_used / QUOTA_BYTES) * 100;

  const availableGB =
    Math.floor((availableBytes / (1024 * 1024 * 1024)) * 100) / 100;

  return {
    availableGB,
    usedPercent,
  };
}

export function calculateTotalSizeMB(files: FileDocument[]) {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  const totalMB = totalBytes / (1024 * 1024);
  return totalMB.toFixed(2); // Returns as string with 2 decimal places
}

export function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  } else if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / 1024).toFixed(2) + " KB";
  }
}

function normalizeDate(dateString?: string | null) {
  if (!dateString) return null;

  return dateString.replace(" ", "T").replace(/\+\d+$/, "Z");
}

export function formatDate(dateString?: string | null) {
  const isoDate = normalizeDate(dateString);

  if (!isoDate) return "—";

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) return "—";

  const time = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${time}, ${day} ${month}`;
}

export function extractFileNameFromSupabaseUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);

    const pathname = parsedUrl.pathname;

    return pathname.substring(pathname.lastIndexOf("/") + 1);
  } catch (error) {
    console.error("Invalid URL");
    return "";
  }
}

function extractFileName(fullUrl: string): string {
  try {
    // لو URL كامل، خد اسم الملف بس
    const url = new URL(fullUrl);
    const pathParts = url.pathname.split("/");
    return pathParts[pathParts.length - 1]; // آخر جزء = اسم الملف
  } catch (error) {
    // لو مش URL، يبقى ده اسم الملف نفسه
    return fullUrl;
  }
}

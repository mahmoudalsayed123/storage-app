export const quota = 1024 * 1024 * 1024 * 2;

export const items = [
  { name: "Dashboard", icon: "/assets/icons/dashboard.svg", path: "/" },
  { name: "Docs", icon: "/assets/icons/documents.svg", path: "/application" },
  { name: "Media", icon: "/assets/icons/video.svg", path: "/media" },
  { name: "Images", icon: "/assets/icons/images.svg", path: "/image" },
  { name: "Other", icon: "/assets/icons/others.svg", path: "/other" },
];

export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export type ActionType = {
  label: string;
  icon: string;
  value: string;
};

export type UserRow = {
  id: string;
  auth_user_id: string | null;
  storage_used: number;
  name: string;
  email: string;
  avatar: string;
};

export interface FileDocument {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  extension: string;
  storage_path: string;
  user_id: string;
  created_at: string;
}

// export const FileTypeColor = {
//     science: "#E5D0FF",
//     maths: "#FFDA6E",
//     language: "#BDE7FF",
//     coding: "#FFC8E4",
//     history: "#FFECC8",
//     economics: "#C8FFDF",
// };

"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  actionsDropdownItems,
  ActionType,
  FileDocument,
} from "@/app/constants";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { deleteFile, getDownloadURL } from "@/app/actions/upload.actions";
import { Input } from "@/components/ui/input";
import { updateFileName } from "@/app/actions/file.actions";
import { redirect, usePathname } from "next/navigation";
import { formatDate, formatFileSize } from "@/app/help/fileUtils";
import { getUserFromDB } from "@/app/actions/user.actions";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

const DropMenue = ({ file }: { file: FileDocument }) => {
  const pathName = usePathname();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [url, setUrl] = useState("");
  const [name, setName] = useState(file?.name);
  const [isLoading, setIsloading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function getUser() {
      const supabase = await supabaseBrowser();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: userData } = await supabase
        .from("users")
        .select("name")
        .eq("email", user?.user_metadata.email);
      setUserName(userData?.[0]?.name);
    }
    getUser();
  }, []);

  const closeAllModals = () => {
    setIsModelOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
  };

  async function getUrl() {
    await getDownloadURL(file?.storage_path).then((res) => {
      setUrl(res);
    });
  }

  async function handleRename() {
    await updateFileName(file?.id, name, file?.extension).then((res) => {
      if (res) {
        closeAllModals();
        redirect(pathName);
      }
    });
  }

  async function handleDelete() {
    await deleteFile(file?.storage_path, file?.id).then((res) => {
      if (res) {
        closeAllModals();
        redirect(pathName);
      }
    });
  }

  const renderDialogContent = () => {
    if (!action) return;
    return (
      <DialogContent className="w-[700px]  rounded-lg">
        <DialogHeader>
          <DialogTitle className="mb-7 text-center">{action.label}</DialogTitle>
          {action.value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {action.value === "details" && (
            <>
              <div className="w-[450px] ps-3 p-2 mb-5 flex items-center gap-5 bg-slate-200 rounded-md">
                {file?.mimeType === "image" ? (
                  <img
                    src={file?.storage_path}
                    alt="image"
                    width={50}
                    height={50}
                    loading="lazy"
                    className="w-[80px] h-[60px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] rounded-full object-cover bg-red-400/10 flex items-center justify-center">
                    <img
                      src={
                        file?.mimeType === "video" || file?.mimeType === "audio"
                          ? "/assets/icons/media/video.svg"
                          : file?.mimeType === "unknown"
                            ? "/assets/icons/other/other.svg"
                            : `/assets/icons/${file?.mimeType}/${file?.extension}.svg`
                      }
                      alt={file?.mimeType}
                      width={30}
                      height={30}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="w-full flex flex-col items-start justify-start gap-1">
                  <p className=" text-[16px] font-semibold line-clamp-1 wrap-break-word">
                    {file?.name}
                  </p>
                  <p className=" text-[14px] text-gray-600 mb-3">
                    {formatDate(file?.created_at)}
                  </p>
                </div>
              </div>

              <div className="text-left p-3 ps-0">
                <p className="mb-3">
                  <span className="font-semibold me-3">Formate: </span>{" "}
                  <span className="text-gray-600 text-[14px]">
                    {file?.extension}
                  </span>
                </p>
                <p className="mb-3">
                  {" "}
                  <span className="font-semibold me-3">Size: </span>{" "}
                  <span className="text-gray-600 text-[14px]">
                    {formatFileSize(file?.size)}
                  </span>
                </p>
                <p className="mb-3">
                  <span className="font-semibold me-3">Owner: </span>
                  <span className="text-gray-600 text-[14px]">{userName}</span>
                </p>
                <p>
                  {" "}
                  <span className="font-semibold me-3">Created At: </span>{" "}
                  <span className="text-gray-600 text-[14px]">
                    {formatDate(file?.created_at)}
                  </span>
                </p>
              </div>
            </>
          )}
          {action.value === "download" && (
            <p className="w-[450px] line-clamp-1 wrap-break-word">
              Are you sure you want to download{" "}
              <span className="font-semibold text-sky-400">{file?.name}</span> ?
            </p>
          )}
          {action.value === "delete" && (
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-400">{file?.name}</span> ?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "download"].includes(action.value) && (
          <DialogFooter className=" flex justify-start mt-4">
            <Button
              onClick={() => {
                if (action.value === "rename") {
                  handleRename();
                  closeAllModals();
                } else if (action.value === "download") {
                  getUrl();
                  closeAllModals();
                } else if (action.value === "delete") {
                  handleDelete();
                  closeAllModals();
                }
              }}
              className={cn(
                action.value === "delete" ? "bg-red-500" : "bg-black",
                "w-full lg:p-3 rounded-full text-white cursor-pointer text-[16px]",
              )}
            >
              <p>{action.value}</p>
              {isLoading && (
                <Image
                  src={"/assets/icons/loader.svg"}
                  alt="loader"
                  width={24}
                  height={24}
                />
              )}
            </Button>
            <Button
              onClick={closeAllModals}
              className="w-full lg:p-3 border border-slate-200 rounded-full mb-5 md:mb-0 cursor-pointer text-[16px]"
            >
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={setIsModelOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="cursor-pointer">
          <Image
            src="/assets/icons/dots.svg"
            alt="dots"
            width={30}
            height={30}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] min-h-[150px] p-2">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="mb-2 text-[16px] font-semibold line-clamp-1">
              {file?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {actionsDropdownItems.map((actionItem) => (
              <DropdownMenuItem
                key={actionItem.value}
                className="mb-1 p-2 rounded-md hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  setAction(actionItem);
                  if (
                    ["rename", "details", "download", "delete"].includes(
                      actionItem.value,
                    )
                  ) {
                    setIsModelOpen(true);
                  }
                }}
              >
                {actionItem.value === "download" ? (
                  <Link
                    href={url}
                    className="w-full h-full flex items-center gap-2"
                  >
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={25}
                      height={25}
                    />
                    {actionItem.label}
                  </Link>
                ) : (
                  <div className=" flex items-center gap-2">
                    <Image
                      src={actionItem.icon}
                      alt={actionItem.label}
                      width={25}
                      height={25}
                    />
                    {actionItem.label}
                  </div>
                )}
                {/* <p className="text-[16px]">{actionItem.label}</p> */}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default DropMenue;

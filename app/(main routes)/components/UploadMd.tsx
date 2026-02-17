"use client";
import {
  addFileToDB,
  updateStorageUsed,
  uploadFile,
} from "@/app/actions/upload.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";

const UploadMd = () => {
  const [storagePath, setStoragePath] = useState("");
  const input = useRef<HTMLInputElement>(null);
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const path = await uploadFile(file);
    setStoragePath(path);
    await updateStorageUsed(file.size);
    await addFileToDB(file, path);
    // reset input
    e.target.value = "";
    redirect("/");
  }

  return (
    <div>
      <label
        htmlFor="upload"
        className="relative flex justify-center items-center gap-2 shadow_xl md:px-2 lg:px-4 py-2 rounded-full cursor-pointer bg-black text-white"
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
        />
        <p className="font-bold text-[14px]">Upload</p>
        <input
          type="file"
          id="upload"
          onChange={handleUpload}
          className=" w-full h-full cursor-pointer rounded-full"
          hidden
          ref={input}
        />
      </label>
    </div>
  );
};

export default UploadMd;

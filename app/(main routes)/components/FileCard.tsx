import { FileDocument } from "@/app/constants";
import {
  formatDate,
  formatFileSize,
  getFilePreviewIcon,
} from "@/app/help/fileUtils";

import DropMenue from "./DropMenue";
import Link from "next/link";
import { getPublicURL } from "@/app/actions/upload.actions";
import Image from "next/image";

const FileCard = async ({ file }: { file: FileDocument }) => {
  const url = await getPublicURL(file?.storage_path);
  return (
    <Link href={url} target="_blank">
      <div className="md:col-span-1 bg-white p-4 rounded-lg  text-black cursor-pointer transition-all duration-300 hover:shadow-xl/30">
        <div className="flex justify-between mb-4 w-full">
          <div className="w-20.5 h-20.5 flex items-center justify-center">
            {file?.mimeType === "image" ? (
              <div className="w-full h-full">
                <Image
                  src={file?.storage_path}
                  alt="image"
                  width={82}
                  height={82}
                  loading="lazy"
                  className="w-full h-full rounded-full"
                />
              </div>
            ) : (
              <div className="w-20.5 h-20.5 rounded-full object-cover bg-red-400/10 flex items-center justify-center ">
                <Image
                  src={getFilePreviewIcon(file)}
                  alt={file?.mimeType}
                  width={36}
                  height={36}
                  loading="lazy"
                />
              </div>
            )}
          </div>
          <div className=" flex flex-col items-center gap-2 pt-2">
            <DropMenue file={file} />
            <p className="text-right text-body font-normal mb-3">
              {formatFileSize(file?.size)}
            </p>
          </div>
        </div>
        <p className=" text-body font-semibold mb-3 line-clamp-1 wrap-break-word">
          {file?.name}
        </p>
        <p className=" text-body font-normal text-gray-600 mb-3">
          {formatDate(file?.created_at)}
        </p>
      </div>
    </Link>
  );
};

export default FileCard;

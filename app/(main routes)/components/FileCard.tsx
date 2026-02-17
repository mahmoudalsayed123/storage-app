import { FileDocument } from "@/app/constants";
import { formatDate, formatFileSize } from "@/app/help/fileUtils";

import DropMenue from "./DropMenue";
import Link from "next/link";
import { getPublicURL } from "@/app/actions/upload.actions";

const FileCard = async ({ file }: { file: FileDocument }) => {
  const url = await getPublicURL(file?.storage_path);
  return (
    <Link href={url} target="_blank">
      <div className="md:col-span-1 bg-white mb-[40px] p-4 rounded-lg  text-black cursor-pointer transition-all duration-300 hover:shadow-xl/30">
        <div className="flex justify-between mb-4">
          {file?.mimeType === "image" ? (
            <img
              src={file?.storage_path}
              alt="image"
              width={50}
              height={50}
              loading="lazy"
              className="w-[80px] h-[80px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[80px] h-[80px] rounded-full object-cover bg-red-400/10 flex items-center justify-center">
              <img
                src={
                  file?.mimeType === "video" || file?.mimeType === "audio"
                    ? "/assets/icons/media/video.svg"
                    : file?.mimeType === "unknown"
                      ? "/assets/icons/other/other.svg"
                      : `/assets/icons/${file?.mimeType}/${file?.extension}.svg`
                }
                alt={file?.mimeType}
                width={50}
                height={50}
                loading="lazy"
              />
            </div>
          )}
          <div className=" flex flex-col items-center gap-2 pt-2">
            <DropMenue file={file} />
            <h3 className="text-right text-[16px] font-semibold mb-3">
              {formatFileSize(file?.size)}
            </h3>
          </div>
        </div>
        <h4 className=" text-[16px] font-semibold mb-3 line-clamp-1 wrap-break-word">
          {file?.name}
        </h4>
        <p className=" text-[14px] text-gray-600 mb-3">
          {formatDate(file?.created_at)}
        </p>
      </div>
    </Link>
  );
};

export default FileCard;

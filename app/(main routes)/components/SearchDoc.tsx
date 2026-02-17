"use client";

import { getFile } from "@/app/actions/file.actions";
import { FileDocument } from "@/app/constants";
import { formatDate } from "@/app/help/fileUtils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SearchDoc = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fileSearch, setFileSearch] = useState<FileDocument[] | null>();

  const router = useRouter();
  const input = useRef(null);

  useEffect(() => {
    async function handleSearchFile() {
      if (searchQuery) {
        await getFile(searchQuery).then((res) => setFileSearch(res));
      } else if (searchQuery === "" || searchQuery === " ") {
        setFileSearch([]);
        setSearchQuery("");
      }
    }
    handleSearchFile();
  }, [searchQuery]);

  function handelRoute(mimeType: string, name: string) {
    setSearchQuery("");
    setFileSearch([]);
    router.push(`/${mimeType}/?name=${name}`);
  }

  return (
    <div className="flex justify-start items-center ms-4">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search For Docs..."
        className="w-50 sm:w-full  outline-none px-4 py-3 border-2 border-black"
        value={searchQuery}
        ref={input}
      />

      <div className="absolute top-[83px] left-[15px] w-[370px] p-1 bg-white rounded-md shadow-lg cursor-pointer">
        {fileSearch &&
          fileSearch.map((file) => (
            <div
              key={file?.id}
              onClick={() => {
                handelRoute(file?.mimeType, file?.name);
              }}
              className="flex justify-between items-center mb-5 p-2 transition-all duration-300 rounded-lg hover:bg-slate-100"
            >
              {file?.mimeType === "image" ? (
                <img
                  src={file?.storage_path}
                  alt="image"
                  width={50}
                  height={50}
                  loading="lazy"
                  className="w-[60px] h-[60px] me-3 rounded-full object-cover"
                />
              ) : (
                <div className="w-[60px] h-[60px] me-3 rounded-full object-cover bg-red-400/10 flex items-center justify-center">
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

              <p className="text-[14px] w-[150px] line-clamp-1 wrap-break-word">
                {file?.name}
              </p>

              <p className="text-[12px] text-slate-600">
                {formatDate(file?.created_at)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchDoc;

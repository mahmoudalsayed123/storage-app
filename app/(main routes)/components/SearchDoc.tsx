"use client";

import { getFile } from "@/app/actions/file.actions";
import { FileDocument } from "@/app/constants";
import { formatDate, getFilePreviewIcon } from "@/app/help/fileUtils";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
    <div className="relative flex items-center ms-4 flex-1">
      <div className="flex items-center gap-2.5  w-full sm:w-120.5 p-4 rounded-4xl shadow-[0px_30px_40px_0px_#5968B20F]">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={15.42}
          height={15.8}
        />
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search For Docs..."
          className="outline-none text-body font-semibold placeholder:text-body placeholder:font-semibold"
          value={searchQuery}
          ref={input}
        />
      </div>
      {fileSearch?.length === 0 ? (
        ""
      ) : (
        <div className="absolute top-[110%] left-0 w-92.5 p-1 bg-white rounded-md shadow-lg cursor-pointer ">
          {fileSearch?.map((file) => (
            <div
              key={file?.id}
              onClick={() => {
                handelRoute(file?.mimeType, file?.name);
              }}
              className="flex justify-between items-center mb-5 p-2 transition-all duration-300 rounded-lg hover:bg-slate-100"
            >
              {file?.mimeType === "image" ? (
                <Image
                  src={file?.storage_path}
                  alt="image"
                  width={50}
                  height={50}
                  loading="lazy"
                  className="w-15 h-15 me-3 rounded-full object-cover"
                />
              ) : (
                <div className="w-15 h-15 me-3 rounded-full object-cover bg-red-400/10 flex items-center justify-center">
                  <Image
                    src={getFilePreviewIcon(file)}
                    alt={file?.mimeType}
                    width={30}
                    height={30}
                    loading="lazy"
                  />
                </div>
              )}

              <p className="text-body w-37.5 line-clamp-1 wrap-break-word">
                {file?.name}
              </p>

              <p className="text-[12px] text-slate-600">
                {formatDate(file?.created_at)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDoc;

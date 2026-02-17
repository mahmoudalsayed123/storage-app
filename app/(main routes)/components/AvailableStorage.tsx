import { getStorageStats } from "@/app/help/fileUtils";
import Image from "next/image";

type user = {
  storage_used: number;
};

const AvailableStorage = ({ storage_used }: user) => {


  return (
    <div className=" bg-cta text-black rounded-xl  flex items-center gap-2 px-3 sm:px-5 py-6 lg:w-fit">
      <div className="size-[150px] rounded-full  sm:me-5 flex flex-col items-center justify-center bg-white shadow-xl/30 cursor-pointer border-8 border-black">
        <h2 className="font-bold text-[24px]">
          {storage_used >= 0 ? (
            `${getStorageStats(storage_used).usedPercent.toFixed(2)}%`
          ) : (
            <Image
              src="/assets/icons/loader-brand.svg"
              alt="spinner"
              width={30}
              height={30}
              className="mb-2 m-auto"
            />
          )}
        </h2>
        <p className="text-[14px] text-black">Space Used</p>
      </div>

      <div className="text-white">
        <h3 className="font-semibold mb-1 sm:text-[24px]">Available Storage</h3>
        <p className=" text-[14px] sm:text-[16px]">
          {storage_used >= 0 ? (
            `${getStorageStats(storage_used).availableGB.toFixed(2)} GB / 2 GB`
          ) : (
            <Image
              src="/assets/icons/loader.svg"
              alt="spinner"
              width={30}
              height={30}
              className="mt-2 m-auto"
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default AvailableStorage;

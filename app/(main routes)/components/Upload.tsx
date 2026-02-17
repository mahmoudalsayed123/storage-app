import Image from "next/image";

const Upload = () => {
  return (
    <label
      htmlFor="upload"
      className="bg-black relative flex justify-center items-center gap-2 shadow_xl p-2 mb-5 rounded-full cursor-pointer"
    >
      <Image
        src="/assets/icons/upload.svg"
        alt="upload"
        width={20}
        height={20}
      />
      <p className="font-bold">Upload</p>
      <input
        type="file"
        id="upload"
        className="bg-red-400 w-full h-full cursor-pointer rounded-full"
        hidden
      />
    </label>
  );
};

export default Upload;

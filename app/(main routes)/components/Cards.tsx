import FileCard from "./FileCard";
import { FileDocument } from "@/app/constants";

const Cards = async ({ files }: { files: FileDocument[] }) => {
  if (!files) return;
  return (
    <section className="file-card_section">
      {files?.map((file) => (
        <FileCard key={file?.id} file={file} />
      ))}
    </section>
  );
};

export default Cards;

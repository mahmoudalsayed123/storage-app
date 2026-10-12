import MainHeading from "@/app/(main routes)/components/MainHeading";
import Cards from "@/app/(main routes)/components/Cards";
import { getUserFromDB } from "@/app/actions/user.actions";
import {
  getFilesFromDBForCurrentUser,
  getSearchFile,
} from "@/app/actions/file.actions";
import { calculateTotalSizeMB } from "@/app/help/fileUtils";
import UploadMd from "../components/UploadMd";

const DynamicRoute = async ({
  params,
  searchParams,
}: {
  params: Promise<{ route: string[] }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const route = (await params).route;
  const users = await getUserFromDB();
  const user = users[0];
  const resolvedSearchParams = await searchParams;
  const fileName =
    typeof resolvedSearchParams.name === "string"
      ? resolvedSearchParams.name
      : "";

  let files;
  if (fileName) {
    files = await getSearchFile(fileName);
  } else {
    files = await getFilesFromDBForCurrentUser(user?.email);
  }
  let filteredFiles;

  if (!route || !files) return;

  if (route[0] === "/") {
    filteredFiles = files;
  } else if (route[0] === "application") {
    filteredFiles = files?.filter((file) => file.mimeType === "application");
  } else if (route[0] === "media") {
    filteredFiles = files?.filter(
      (file) => file.mimeType === "video" || file.mimeType === "video",
    );
  } else if (route[0] === "image") {
    filteredFiles = files?.filter((file) => file.mimeType === "image");
  } else {
    filteredFiles = files?.filter(
      (file) =>
        file.mimeType !== "application" &&
        file.mimeType !== "audio" &&
        file.mimeType !== "video" &&
        file.mimeType !== "image",
    );
  }

  const totalSize = calculateTotalSizeMB(filteredFiles);

  if (filteredFiles?.length === 0)
    return (
      <section className="main-section min-h-full bg-surface-background flex flex-col items-center justify-center gap-5">
        <h2 className="w-fit text-4xl font-bold">NO FILES FOUNDED ❌</h2>
        <UploadMd />
      </section>
    );

  return (
    <section className="main-section bg-surface-background w-full h-full overflow-y-auto">
      <div className="w-full">
        <MainHeading heading={route[0]} totalSize={totalSize} />
      </div>
      <section className="w-full">
        <Cards files={filteredFiles} />
      </section>
    </section>
  );
};

export default DynamicRoute;

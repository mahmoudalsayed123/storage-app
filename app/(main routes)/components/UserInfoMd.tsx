import { getUserFromDB } from "@/app/actions/user.actions";
import { getFirstName } from "@/app/help/fileUtils";
import Image from "next/image";

const UserInfoMd = async () => {
  const users = await getUserFromDB();
  const user = users[0];
  if (!user) return null;
  return (
    <div className="absolute bottom-12.5 left-2 md:w-50 lg:w-67.5 text-black flex items-center md:gap-5 lg:gap-5 p-2 ps-3 shadow_xl rounded-full ">
      <div className="flex items-center gap-2 ">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="userButton"
            width={60}
            height={40}
            className=" rounded-full"
          />
        ) : (
          <Image
            src={"/assets/icons/loader-brand.svg"}
            alt="userButton"
            width={60}
            height={40}
          />
        )}
      </div>
      <div className="flex flex-col justify-start items-start w-full">
        <h2 className="w-fit text-title font-bold md:ms-2 lg:ms-0">
          {getFirstName(user.name)}
        </h2>
        <p className="text-label md:hidden lg:block">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfoMd;

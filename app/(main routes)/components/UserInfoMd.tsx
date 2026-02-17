import { getUserFromDB } from "@/app/actions/user.actions";
import { getFirstName } from "@/app/help/fileUtils";
import Image from "next/image";

const UserInfoMd = async () => {
  const users = await getUserFromDB();
  const user = users[0];
  if (!user) return null;
  return (
    <div className="absolute bottom-[50px] left-[8px] md:w-[200px] lg:w-[270px]  bg-black text-white flex items-center md:gap-5 lg:gap-5 p-2 ps-3 shadow_xl rounded-full ">
      <div className="flex items-center gap-2 ">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="userButton"
            width={30}
            height={30}
            className="w-[40px] h-[30px] rounded-full"
          />
        ) : (
          <Image
            src={"/assets/icons/loader-brand.svg"}
            alt="userButton"
            width={30}
            height={30}
            className="w-[30px] h-[30px]"
          />
        )}
      </div>
      <div className="flex flex-col justify-start items-start w-full">
        <h2 className="w-fit md:text-[14px] lg:text-[14px] md:ms-2 lg:ms-0">
          {getFirstName(user.name)}
        </h2>
        <p className="text-[12px] md:hidden lg:block">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfoMd;

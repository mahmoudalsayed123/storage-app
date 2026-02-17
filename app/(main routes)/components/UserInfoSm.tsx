import { getUserFromDB } from "@/app/actions/user.actions";
import { getFirstName } from "@/app/help/fileUtils";
import Image from "next/image";

const UserInfoSm = async () => {
  const users = await getUserFromDB();
  const user = users[0];
  return (
    <div className="flex items-center gap-4 p-2 shadow_xl w-[300px]">
      <div className="flex items-center gap-4 md:gap-2">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt="userButton"
            width={30}
            height={30}
            className="min-w-[50px] min-h-[40px] rounded-full me-2"
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
      <div className="flex-col justify-center items-center">
        <h2 className="w-fit text-[16px] md:text-[14px] lg:text-[20px]">
          {getFirstName(user.name)}
        </h2>
        <p className="w-fit text-[14px] truncate">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfoSm;

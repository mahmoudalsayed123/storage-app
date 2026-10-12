import { getUserFromDB } from "@/app/actions/user.actions";
import { getFirstName } from "@/app/help/fileUtils";
import Image from "next/image";

const UserInfoSm = async () => {
  const users = await getUserFromDB();
  const user = users[0];
  return (
    <div className="flex items-center gap-4 p-2 rounded-4xl shadow_xl w-75 bg-primary">
      <div className="flex items-center gap-4 md:gap-2">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt="userButton"
            width={30}
            height={30}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Image
            src={"/assets/icons/loader-brand.svg"}
            alt="userButton"
            width={30}
            height={30}
            className="w-7.5 h-7.5"
          />
        )}
      </div>
      <div className="flex-col justify-center items-center">
        <h2 className="w-fit text-body">{getFirstName(user.name)}</h2>
        <p className="w-fit text-label truncate">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfoSm;

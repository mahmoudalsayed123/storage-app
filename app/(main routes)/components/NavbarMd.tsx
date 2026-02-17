import SearchDoc from "./SearchDoc";
import UploadMd from "./UploadMd";
import LogOutMd from "./LogOutMd";
import { getUserFromDB } from "@/app/actions/user.actions";

const NavbarMd = async () => {
  const users = await getUserFromDB();
  const user = users[0];
  if (!user) return null;
  return (
    <nav className="hidden w-full fixed top-0 md:left-[250px] lg:left-[300px]  z-10 bg-white md:flex items-center p-4 border-b-2 border-black">
      <SearchDoc />
      <div className="flex items-center gap-6 absolute md:right-[270px] lg:right-[350px]">
        <UploadMd />
        <LogOutMd user={user} />
      </div>
    </nav>
  );
};
export default NavbarMd;

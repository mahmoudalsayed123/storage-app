import SearchDoc from "./SearchDoc";
import UploadMd from "./UploadMd";
import LogOutMd from "./LogOutMd";
import { getUserFromDB } from "@/app/actions/user.actions";

const NavbarMd = async () => {
  const users = await getUserFromDB();
  const user = users[0];
  if (!user) return null;
  return (
    <nav className="hidden w-full md:flex items-center p-4 ">
      <SearchDoc />
      <div className="flex items-center gap-6">
        <UploadMd />
        <LogOutMd user={user} />
      </div>
    </nav>
  );
};
export default NavbarMd;

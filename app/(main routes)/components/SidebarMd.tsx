import Items from "./Items";
import LogoMd from "./LogoMd";
import UserInfoMd from "./UserInfoMd";

const SidebarMd = async () => {
  return (
    <div className="hidden w-75 md:block px-2 py-4 min-h-screen">
      <div className="flex justify-start items-center px-4 py-3">
        <LogoMd />
      </div>
      <Items />
      <UserInfoMd />
    </div>
  );
};
export default SidebarMd;

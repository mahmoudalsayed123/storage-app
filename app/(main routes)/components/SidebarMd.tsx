import Items from "./Items";
import LogoMd from "./LogoMd";
import UserInfoMd from "./UserInfoMd";

const SidebarMd = async () => {
  return (
    <div className="hidden fixed top-0 left-0  md:w-[250px] lg:w-[300px] md:block px-2 py-4 min-h-screen border-r-2 border-black">
      <div className="flex justify-start items-center px-4 py-3">
        <LogoMd />
      </div>
      <Items />
      <UserInfoMd />
    </div>
  );
};
export default SidebarMd;

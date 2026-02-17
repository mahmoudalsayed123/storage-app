import SidebarSm from "./SidebarSm";
import SearchDoc from "./SearchDoc";
import LogoSm from "./LogoSm";

const NavbarSm = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white flex justify-between items-center md:hidden p-4 border-b-2 border-black">
      <LogoSm />
      <SearchDoc />
      <SidebarSm />
    </nav>
  );
};

export default NavbarSm;

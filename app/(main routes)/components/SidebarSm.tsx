import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Items from "./Items";
import Upload from "./Upload";
import UserInfoSm from "./UserInfoSm";
import LogOutSm from "./LogOutSm";
import { getUserFromDB } from "@/app/actions/user.actions";

const SidebarSm = async () => {
  const users = await getUserFromDB();
  const user = users[0];
  if (!user) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/menu.svg"
          alt="burger_icon"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <UserInfoSm />
          </SheetTitle>
          <SheetDescription>
            <Items />
            <Upload />
            <LogOutSm user={user} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSm;

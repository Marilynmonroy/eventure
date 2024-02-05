"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { IoMenu } from "react-icons/io5";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <IoMenu className="text-3xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <h1 className="text-2xl font-extrabold color text-primary-500">
            Eventure
          </h1>
          <Separator className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

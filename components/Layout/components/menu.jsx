import { Edit, PanelLeftOpen, TrendingUp } from "lucide-react";

import { Menubar } from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";
import { useSidebarStatus } from "@/state";
import menuLinks from "../data/menu-links";

export function Menu() {
  const { isSidebarOpen, toggleSidebar } = useSidebarStatus();
  return (
    <Menubar className="rounded-none bg-inherit border-b border-none px-2 lg:px-4 justify-between">
      <div className="flex">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src="/black_logo.png"
              width={50}
              height={50}
              alt="Sahib AI"
              className="h-10 w-10 block md:hidden"
            />
          </Link>

          {!isSidebarOpen && (
            <PanelLeftOpen
              className="hover:cursor-pointer h-7 w-7 hidden md:block"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>

      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mr-3">
            <Button size="sm" className="px-3 md:px-5">
              <Edit className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end" forceMount>
            {menuLinks.map((menuLink, key) => (
              <div key={menuLink.name}>
                <Link href={menuLink.url}>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    {menuLink.icon}
                    <span>{menuLink.name}</span>
                  </DropdownMenuItem>
                </Link>
                {menuLinks.length - 1 !== key && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <UserNav />
      </div>
    </Menubar>
  );
}

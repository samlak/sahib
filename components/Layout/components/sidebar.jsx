import { PanelLeftClose, TrendingUp, RotateCw } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarStatus } from "@/state";
import Link from "next/link";
import menuLinks from "../data/menu-links";

export function Sidebar({ activeTab, className }) {
  const { toggleSidebar } = useSidebarStatus();

  return (
    <div className={cn("h-screen fixed", className)}>
      <div className="px-4 relative">
        <div className="mt-4 mb-7 flex justify-between items-center">
          <Link href={"/"}>
            <div className="w-[35px] h-[35px]">
              <Image
                src="/black_logo.png"
                width={50}
                height={50}
                alt="Sahib AI"
              />
            </div>
          </Link>

          <div>
            <PanelLeftClose
              className="hover:cursor-pointer h-7 w-7"
              onClick={toggleSidebar}
            />
          </div>
        </div>

        <ScrollArea className="h-[500px] -mt-3">
          <div className="space-y-1">
            {menuLinks.map((menuLink) => (
              <Link href={menuLink.url} key={menuLink.name}>
                <Button
                  size="sm"
                  variant={`${menuLink.name == activeTab ? "" : "ghost"}`}
                  className="w-full justify-start my-[1px]"
                >
                  {menuLink.icon}
                  {menuLink.name}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>

        <div className="fixed bottom-0 left-0 w-[240px] py-2 border-r border-t">
          <footer className="text-sm font-medium text-center px-2 pt-3 pb-2">
            For feedback contact us through{" "}
            <a
              href="mailto:samlak1999@gmail.com"
              target="_blank"
              className="text-blue-600 hover:text-blue-800"
            >
              email here
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

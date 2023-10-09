import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import { Briefcase, X } from "lucide-react";

export function MainNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: session } = useSession();

  const items = [
    {
      title: "Features",
      href: "/#features",
    },
  ];

  return (
    <>
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Briefcase />
          <span className="hidden font-bold sm:inline-block">{"Sahib AI"}</span>
        </Link>
        {items.length ? (
          <nav className="hidden gap-6 md:flex">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X /> : <Briefcase />}
          <span className="font-bold">Menu</span>
        </button>
        {showMobileMenu && items && (
          <div
            className={cn(
              "fixed inset-0 top-12 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
            )}
          >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
              <Link href="/" className="flex items-center space-x-2">
                <Briefcase />
                <span className="font-bold">{"Sahib AI"}</span>
              </Link>
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                {items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                      item.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      <nav className="flex justify-center items-center">
        {session ? (
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "px-4"
            )}
          >
            Go to Profile
          </Link>
        ) : (
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "px-4"
            )}
          >
            Login
          </Link>
        )}
      </nav>
    </>
  );
}

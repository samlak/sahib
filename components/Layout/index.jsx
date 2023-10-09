import { useEffect } from "react"
import { Menu } from "./components/menu"
import { Sidebar } from "./components/sidebar"
import { useSidebarStatus } from "@/state"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function LayoutTemplate({ activeTab, children }) {
  const { isSidebarOpen } = useSidebarStatus();
  const { data: session } = useSession();

  return (
    <div className="flex justify-between h-fit">
      <Sidebar 
        activeTab={activeTab}
        className={`hidden ${isSidebarOpen && "md:block"} w-[240px] md:border-r`}
      />
      <div className={`hidden ${isSidebarOpen && "md:block"} w-[240px] md:border-r`}></div>
      <div 
        className={`w-full ${isSidebarOpen && "md:content-width-md"} relative`}
      >
        <div className={`fixed bg-white block w-full ${isSidebarOpen && "md:content-width-md"} z-50`}>
          <div className="border-b py-2">
            <Menu />
          </div>
        </div>
        
        <div className={`text-accent-foreground px-4 py-6 lg:px-8 mt-14`}>
          { children }
        </div>

        <footer className="text-sm font-medium text-center px-2 pb-10 block md:hidden">
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
  )
}

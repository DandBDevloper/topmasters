import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";
import MenuItems from "../sidebar-panel/MenuItems";

const ProSidebarContent = () => {
  const path = usePathname();



  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <div className="hiddenbar_navbar_menu">
            <MenuItems />
          </div>
    </Sidebar>
  );
};

export default ProSidebarContent;

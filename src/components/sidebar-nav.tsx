import React, { FC } from "react";
import Sidebar from "./sidebar";
import { Workspace } from "@/types/app";

type SidebarNavProps = {
  userWorkspaceData: Workspace[];
  currentWorkspaceData: Workspace;
};

const SidebarNav: FC<SidebarNavProps> = () => {
  return (
    <nav>
      <ul className="flex-col space-y-4">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden"></div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;

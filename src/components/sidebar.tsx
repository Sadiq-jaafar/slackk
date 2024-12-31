import { User, Workspace } from "@/types/app";
import React, { FC } from "react";
import { getCurrentWorkspaceData } from "../actions/workspaces";
import { log } from "console";
import { getUserData } from "@/actions/get-user-data";
import SidebarNav from "@/components/sidebar-nav";
type SidebarProps = {
  userWorkspacesData: Workspace[];
  currentWorkspaceData: Workspace;
  userData: User;
};

const Sidebar: FC<SidebarProps> = ({
  userData,
  userWorkspacesData,
  currentWorkspaceData,
}) => {
  return (
    <aside
      className={`
    fixed
    top-0
    left-0
    pt-[68px]
    pb-8
    z-30
    flex
    flex-col
    justify-between
    items-center
    h-screen
    w-20
    `}
    >
      <SidebarNav
        currentWorkspaceData={currentWorkspaceData}
        userWorkspaceData={userWorkspacesData}
      />
    </aside>
  );
};
export default Sidebar;

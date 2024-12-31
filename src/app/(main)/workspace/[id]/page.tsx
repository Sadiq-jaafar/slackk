// import { getUserData } from "@/actions/get-user-data";
// import {
//   getCurrentWorkspaceData,
//   getUserWorkspaceData,
// } from "@/actions/workspaces";
// import { redirect } from "next/navigation";
// import React from "react";

// const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
//   const userData = await getUserData();
//   if (!userData) {
//     return redirect("/auth");
//   }
//   const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(
//     userData.workspaces!
//   );

//   const [currentWorkspaceData, currentWorkspaceError] =
//     await getCurrentWorkspaceData(id);

//   console.log(currentWorkspaceData);
//   return <div>Workspace</div>;
// };

// export default Workspace;

import { getUserData } from "@/actions/get-user-data";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/workspaces";
import Sidebar from "@/components/sidebar";
import { redirect } from "next/navigation";
import React from "react";
import { Workspace as UserWorkspace } from "@/types/app";

const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();
  if (!userData) {
    return redirect("/auth");
  }

  const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(
    userData.workspaces!
  );

  const { data: currentWorkspaceData, error: currentWorkspaceError } =
    await getCurrentWorkspaceData(id);
  if (currentWorkspaceError) {
    console.error(
      "Error fetching current workspace data:",
      currentWorkspaceError
    );
    // return <div>Error fetching current workspace data</div>;
  }

  console.log(currentWorkspaceData);
  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userWorkspacesData={userWorkspaceData as UserWorkspace[]}
          userData={userData}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;

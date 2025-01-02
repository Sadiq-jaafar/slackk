"use client";

import { User, Workspace } from "@/types/app";
import React, { FC } from "react";
import SidebarNav from "@/components/sidebar-nav";
import { FiPlus } from "react-icons/fi";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useColorPrefrences } from "@/provider/color-prefrences";
import { GoDot, GoDotFill } from "react-icons/go";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Typography from "./ui/typography";
import { GiNightSleep } from "react-icons/gi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";

type SidebarProps = {
  userWorkspacesData: Workspace[];
  currentWorkspaceData: Workspace;
  userData: User;
};

// Define valid color options
type ColorPreference = "green" | "blue";

const Sidebar: FC<SidebarProps> = ({
  userData,
  userWorkspacesData,
  currentWorkspaceData,
}) => {
  const { color } = useColorPrefrences();

  // Explicitly type backgroundColorMap
  const backgroundColorMap: Record<ColorPreference | "default", string> = {
    green: "bg-green-700",
    blue: "bg-blue-700",
    default: "bg-primary-dark",
  };

  // Ensure color is of type ColorPreference
  const backGroundColor =
    backgroundColorMap[color as ColorPreference] || backgroundColorMap.default;

  return (
    <aside className="fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20">
      <SidebarNav
        currentWorkspaceData={currentWorkspaceData}
        userWorkspaceData={userWorkspacesData}
      />
      <div className="flex flex-col space-y-3">
        <div
          className="bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300 hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10"
          aria-label="Add"
        >
          <FiPlus size={28} />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="h-10 w-10 relative cursor-pointer">
                      <div className="h-full w-full rounded-lg overflow-hidden">
                        <Image
                          className="object-cover w-full h-full"
                          src={userData.avatar_url}
                          alt={userData.name || "User"}
                          width={300}
                          height={300}
                        />
                        <div
                          className={cn(
                            "absolute z-10 rounded-full -right-[20%] -bottom-1",
                            backGroundColor
                          )}
                        >
                          {userData.is_away ? (
                            <GoDot className="text-white text-xl" />
                          ) : (
                            <GoDotFill size={17} className="text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right">
                    <div>
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={userData.avatar_url} />
                          <AvatarFallback>
                            {userData.name && userData.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Typography
                            variant="p"
                            text={userData.name || userData.email}
                            className="font-bold"
                          />
                          <div className="flex items-center space-x-1">
                            {userData.is_away ? (
                              <GiNightSleep size={12} />
                            ) : (
                              <GoDotFill size={17} className="text-green-600" />
                            )}
                            <span className="text-xs">
                              {userData.is_away ? "Away" : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="border group cursor-pointer mt-4 mb-2 p-1 rounded flex items-center space-x-2">
                        <FaRegCalendarCheck className="group-hover:hidden" />
                        <FaPencil className="hidden group-hover:block" />
                        <Typography
                          variant="p"
                          text={"In a meeting"}
                          className="text-xs text-grar-600
                        "
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Typography
                          variant="p"
                          text={
                            userData.is_away
                              ? "Set Yourself active"
                              : "Set yourself away"
                          }
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                        <Typography
                          variant="p"
                          text={"Clear status"}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                        <hr className="bg-gray-400" />
                        <Typography
                          variant="p"
                          text={"Profile"}
                          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
                        />
                        {/* prefrence dialog*/}
                        <hr className="bg-gray-400" />
                        <div className="flrx gap-2 items-center hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer">
                          <IoDiamondOutline className="text-orange-400" />
                          <Typography
                            text={`Upgrade ${currentWorkspaceData.name}`}
                            variant="p"
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;

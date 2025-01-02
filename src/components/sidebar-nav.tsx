import React, { FC } from "react";
import Sidebar from "./sidebar";
import { Workspace } from "@/types/app";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { PiChatsTeardrop } from "react-icons/pi";

type SidebarNavProps = {
  userWorkspaceData: Workspace[];
  currentWorkspaceData: Workspace;
};

const SidebarNav: FC<SidebarNavProps> = ({
  currentWorkspaceData,
  userWorkspaceData,
}) => {
  return (
    <nav>
      <ul className="flex-col space-y-4">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarImage
                      src={currentWorkspaceData.image_url || ""}
                      alt={currentWorkspaceData.name}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-natural-700 ">
                      <Typography
                        text={currentWorkspaceData.name.slice(0, 2)}
                        variant="p"
                      />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="p-0" side="bottom">
                  <Card className="w-350px border-0">
                    <CardContent className="flex p-0 flex-col">
                      {userWorkspaceData.map((workspace) => (
                        <div
                          className="hover:opacity-70 px-2 py-1 flex gap-2"
                          key={workspace.id}
                        >
                          <Avatar>
                            <AvatarImage
                              src={workspace.image_url || ""}
                              alt={workspace.name}
                              className="object-cover w-full h-full"
                            />
                            <AvatarFallback>
                              <Typography
                                text={workspace.name.slice(0, 2)}
                                variant="p"
                              />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Typography
                              text={workspace.name}
                              variant="p"
                              className="text-sm"
                            />
                            <Typography
                              text={workspace.invite_code || ""}
                              variant="p"
                              className="text-xs lg:text-xs"
                            />
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex items-center gap-2 p-2">
                        <Button variant="secondary">
                          <FaPlus />
                        </Button>
                        <Typography text="Add Workspace" variant="p" />
                      </div>
                    </CardContent>
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgb(255,255,255,0.3)]">
              <RiHome2Fill
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography
              text="Home"
              variant="p"
              className="text-xs lg:text-sm md:text-sm"
            />
          </div>
        </li>
        <li>
          <div className="flex flex-col cursor-pointer group text-white">
            <div className="flex flex-col items-center cursor-pointer group text-white">
              <div className="p-2 rounded-lg bg-[rgb(255,255,255,0.3)]">
                <PiChatsTeardrop
                  size={20}
                  className="group-hover:scale-125 transition-all duration-300"
                />
              </div>
              <Typography
                text="Dms"
                variant="p"
                className="text-xs lg:text-sm md:text-sm"
              />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;

"use client";
import { cn } from "@/lib/utils";
import { useColorPrefrences } from "@/provider/color-prefrences";
import { useTheme } from "next-themes";
import { FC, ReactNode } from "react";

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const { color } = useColorPrefrences();

  let backGroundColor = "bg-primary-dark";
  if (color === "green") {
    backGroundColor = "bg-green-700";
  } else if (color === "blue") {
    backGroundColor = "bg-blue-700";
  }

  return (
    <div
      className={cn("md:px-2 md:pb-2 md:h-screen md:pt-14", backGroundColor)}
    >
      <main
        className={cn(
          "md:ml-[280px] lg:ml-[420px] md:h-full overflow-scroll [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2",
          theme === "dark" ? "bg-[#232529]" : "bg-light"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;

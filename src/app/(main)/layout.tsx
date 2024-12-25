"use client";
import MainContent from "@/components/main-content";
import { ColorPrefrencesProvider } from "@/provider/color-prefrences";
import { ThemeProvider } from "next-themes";
import React, { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorPrefrencesProvider>
        <MainContent>{children}</MainContent>
      </ColorPrefrencesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;

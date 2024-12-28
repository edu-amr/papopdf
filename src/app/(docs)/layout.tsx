"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppHeader } from "./_components/app-header";
import { AppSidebar } from "./_components/sidebar/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SidebarProvider>
      <QueryClientProvider client={queryClient}>
        <AppSidebar />
        <SidebarInset className="flex max-h-screen overflow-hidden flex-col h-screen">
          <AppHeader />
          {children}
        </SidebarInset>
      </QueryClientProvider>
    </SidebarProvider>
  );
}

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { Loading } from "@/components/loading";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavUser } from "./nav-user";

async function fetchDocuments({ pageParam = 1 }) {
  const res = await fetch(`/api/documents-links?page=${pageParam}&perPage=40`);
  if (!res.ok) {
    throw new Error("Erro ao buscar documentos");
  }
  return res.json();
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isError, isLoading } =
    useInfiniteQuery({
      queryKey: ["documents-links"],
      queryFn: fetchDocuments,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, perPage, total } = lastPage;
        const nextPage = page + 1;
        return nextPage * perPage <= total ? nextPage : undefined;
      },
    });

  const allDocuments = data?.pages.flatMap((page) => page.documents) || [];
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const currentElement = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={"/documentos"}>
                <Image src="/icons/logo.png" alt="logo" width={120} height={30} />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-muted-foreground font-bold opacity-40">Documentos</SidebarGroupLabel>
          {isLoading && <Loading className="w-5 m-auto" />}
          {isError && <div>Erro: {(error as Error)?.message}</div>}

          <SidebarMenu>
            {allDocuments.map((item) => (
              <SidebarMenuItem key={item.id}>
                <Link href={item.url}>
                  <SidebarMenuButton
                    asChild
                    className={
                      pathname === item.url
                        ? "bg-sidebar-accent text-sidebar-accent-foreground truncate block"
                        : "truncate block"
                    }
                  >
                    <p className="w-full truncate font-semibold">{item.title}</p>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          {hasNextPage && !isFetchingNextPage && (
            <div
              ref={loadMoreRef}
              className="h-10 flex justify-center items-center text-sm text-muted-foreground"
            >
              Role para ver mais...
            </div>
          )}
          {isFetchingNextPage && <Loading className="w-5 m-auto" />}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-white border-t">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

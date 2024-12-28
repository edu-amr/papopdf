import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { PricingModal } from "./pricing-modal";
import { UploadButton } from "./upload/upload-button";

export function AppHeader() {
  return (
    <header className="border-b-1 border-b border-gray-200 bg-white px-5 py-4">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="border-slate-900 w-[2px] h-7" />
          <UploadButton className="rounded-xl" useMedia />
        </div>
        <PricingModal className="md:text-sm font-semibold btn-pulse text-xs" />
      </div>
    </header>
  );
}

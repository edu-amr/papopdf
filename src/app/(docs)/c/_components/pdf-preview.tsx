"use client";

import "@react-pdf-viewer/core/lib/styles/index.css";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { RenderGoToPageProps } from "@react-pdf-viewer/page-navigation";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";
import { RenderZoomInProps, RenderZoomOutProps } from "@react-pdf-viewer/zoom";
import { ChevronDown, ChevronUp, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon } from "lucide-react";
import pdfjsPackage from "pdfjs-dist/package.json";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DeleteChat } from "./delete-chat";

const pdfjsVersion = pdfjsPackage.version;

interface PDFPreviewProps {
  className?: string;
  url: string;
  chatId: string;
}

export function PDFPreview({ className, url, chatId }: PDFPreviewProps) {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <div className={cn(["w-full bg-white overflow-hidden", className])}>
      <div className="flex gap-2 justify-between imtes-center w-full border-b border-gray-200 p-5">
        <Toolbar>
          {(props: ToolbarSlot) => {
            const {
              CurrentPageInput,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              ZoomIn,
              ZoomOut,
            } = props;
            return (
              <>
                <div className="flex items-center gap-2">
                  <DeleteChat chatId={chatId} />
                  <GoToPreviousPage>
                    {(props: RenderGoToPageProps) => (
                      <Button
                        disabled={props.isDisabled}
                        onClick={props.onClick}
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <ChevronUp />
                      </Button>
                    )}
                  </GoToPreviousPage>
                  <div className="flex items-center gap-2">
                    <div className="max-w-12 text-sm font-semibold text-zinc-900">
                      <CurrentPageInput />
                    </div>
                    <span className="text-sm font-semibold text-zinc-900">De</span>
                    <div className="text-sm font-semibold text-zinc-900">
                      <NumberOfPages />
                    </div>
                  </div>
                  <GoToNextPage>
                    {(props: RenderGoToPageProps) => (
                      <Button
                        className="rounded-xl"
                        disabled={props.isDisabled}
                        onClick={props.onClick}
                        variant={"ghost"}
                        size={"icon"}
                      >
                        <ChevronDown />
                      </Button>
                    )}
                  </GoToNextPage>
                </div>
                <div className="bg-white flex items-center gap-3">
                  <ZoomOut>
                    {(props: RenderZoomOutProps) => (
                      <Button
                        onClick={props.onClick}
                        variant={"outline"}
                        size={"icon"}
                        className="rounded-xl"
                      >
                        <ZoomOutIcon />
                      </Button>
                    )}
                  </ZoomOut>
                  <ZoomIn>
                    {(props: RenderZoomInProps) => (
                      <Button
                        onClick={props.onClick}
                        variant={"outline"}
                        size={"icon"}
                        className="rounded-xl"
                      >
                        <ZoomInIcon />
                      </Button>
                    )}
                  </ZoomIn>
                </div>
              </>
            );
          }}
        </Toolbar>
      </div>

      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={url} plugins={[toolbarPluginInstance]} />
      </Worker>
    </div>
  );
}

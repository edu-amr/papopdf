import { Loading as MainAppLoading } from "@/components/loading";

export default function Loading() {
  return (
    <div className="flex absolute h-screen w-full top-0 left-0 z-10 items-center justify-center">
      <MainAppLoading />
    </div>
  );
}

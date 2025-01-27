import { Spinner } from "@/components/ui/spinner";
export function Loading() {
  return (
    <div className="flex flex-1 justify-center items-center h-screen">
      <Spinner className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
}

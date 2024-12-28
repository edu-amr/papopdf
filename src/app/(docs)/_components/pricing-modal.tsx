import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
//import { Pricings } from "../../_components/pricings-cards";

interface PricingModalProps {
  className?: string;
}

// const freePlan = [{}];

// const plusPlan = [];

// const proPlan = [];

export function PricingModal({ className }: PricingModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className={cn(["rounded-xl", className])}>
          ✨ Upgrade do Plano
        </Button>
      </DialogTrigger>
      <DialogContent className="h-screen w-full max-w-screen overflow-scroll">
        <DialogHeader className="pt-14">
          <DialogTitle className="text-center text-3xl">Atualize o seu plano</DialogTitle>
        </DialogHeader>
        {/* <Pricings /> */}
      </DialogContent>
    </Dialog>
  );
}

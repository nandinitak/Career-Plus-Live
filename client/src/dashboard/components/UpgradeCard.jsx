import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CheckoutButton from "@/components/CheckoutButton";
import { DiamondPlus, SparklesIcon } from "lucide-react";
function UpgradeCard() {
  return (
    <div className="mt-auto p-4">
      <Card x-chunk="dashboard-02-chunk-0">
        <CardHeader className="p-2 pt-0 md:p-4">
          <CardTitle className="flex flex-">
            <div className="flex flex-row items-center">
              <div>
                <DiamondPlus className="h-4 w-4 mr-1" />
              </div>
              <div className="cp-text-gradient"> Testimonials</div>
            </div>
          </CardTitle>

          <CardDescription>
            Unlock all features and get unlimited credits.
          </CardDescription>
          <div>
            <Progress value={33} />
            <p className="text-sm my-2 text-slate-500">
              82 Out of 100 Credits Used
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <CheckoutButton />
        </CardContent>
      </Card>
    </div>
  );
}

export default UpgradeCard;

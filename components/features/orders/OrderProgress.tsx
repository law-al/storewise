import { cn } from "@/lib/utils";
import { Package, Truck, CheckCircle } from "lucide-react";
import { Separator } from "../../ui/separator";
import React from "react";
const steps = [
  {
    id: "processing",
    label: "Packaging",
    icon: Package,
    step: "Step 1",
  },
  {
    id: "shipped",
    label: "Shipping",
    icon: Truck,
    step: "Step 2",
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: CheckCircle,
    step: "Step 3",
  },
];

export default function OrderProgress({
  currentStatus,
}: {
  currentStatus: string;
}) {
  function getStepStatus(stepId: string) {
    // currenstatus = shipping ?
    const currentIndex = steps.findIndex((step) => step.id === currentStatus); // 2
    const stepIndex = steps.findIndex((step) => step.id === stepId); //

    if (stepIndex <= currentIndex) {
      return "completed";
    } else {
      return "upcoming";
    }
  }

  function getStepStyle(status: string) {
    switch (status) {
      case "completed":
        return {
          circle: "bg-themeOrange-300 border-themeOrange-300 text-white",
          text: "text-themeOrange-300",
          step: "text-white",
        };
      default:
        return {
          circle: "border-gray-300 text-gray-400",
          text: "text-gray-400",
          step: "text-gray-400",
        };
    }
  }

  const getSeparatorStatus = (index: number) => {
    // INDEX = 2, CURRENTINDEX = 2
    const currentIndex = steps.findIndex((step) => step.id === currentStatus);
    return index < currentIndex ? "completed" : "pending";
  };

  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step, index) => {
        const status = getStepStatus(step.id);
        const styles = getStepStyle(status);
        const IconComponent = step.icon;

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center space-y-3">
              <div
                className={cn(
                  "flex items-center justify-center rounded-full shadow-sm w-9 h-9 transition-all duration-300",
                  styles.circle
                )}
              >
                <IconComponent
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    styles.step
                  )}
                />
              </div>
              <span className="text-xs">{step.step}</span>
              <p
                className={cn(
                  "text-sm font-medium transition-colors duration-300"
                )}
              >
                {step.label}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 px-4">
                <Separator
                  className={cn(
                    "h-0.5 border-2  transition-colors duration-300",
                    getSeparatorStatus(index) === "completed"
                      ? "border-themeOrange-300"
                      : "border-gray-300"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

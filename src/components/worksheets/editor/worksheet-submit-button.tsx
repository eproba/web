import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LoaderCircleIcon, PenIcon } from "lucide-react";
import React from "react";

import { FormErrors } from "./form-errors";

interface WorksheetSubmitButtonProps {
  isSubmitting: boolean;
  showDescriptions: boolean;
  mode: "create" | "edit";
  variant: "template" | "worksheet";
}

export const WorksheetSubmitButton: React.FC<WorksheetSubmitButtonProps> = ({
  isSubmitting,
  showDescriptions,
  mode,
  variant,
}) => {
  return (
    <motion.div layout className="space-y-4 text-center">
      <FormErrors showDescriptions={showDescriptions} />
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="min-w-[200px]"
      >
        {isSubmitting ? (
          <>
            <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
            {mode === "create" ? "Tworzenie..." : "Zapisywanie..."}
          </>
        ) : (
          <>
            <PenIcon className="mr-2 size-4" />
            {mode === "create"
              ? `Utwórz ${variant === "worksheet" ? "próbę" : "szablon"}`
              : "Zapisz zmiany"}
          </>
        )}
      </Button>
    </motion.div>
  );
};

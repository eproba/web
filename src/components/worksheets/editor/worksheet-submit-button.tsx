import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LoaderCircleIcon, PenIcon } from "lucide-react";
import React from "react";

interface WorksheetSubmitButtonProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  mode: "create" | "edit";
  variant: "template" | "worksheet";
}

export const WorksheetSubmitButton: React.FC<WorksheetSubmitButtonProps> = ({
  isSubmitting,
  onSubmit,
  mode,
  variant,
}) => {
  return (
    <motion.div layout>
      <form onSubmit={onSubmit} className="text-center">
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
      </form>
    </motion.div>
  );
};

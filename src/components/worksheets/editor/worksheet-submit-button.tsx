import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PenIcon } from "lucide-react";
import { motion } from "framer-motion";

interface WorksheetSubmitButtonProps {
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  mode: "create" | "edit";
}

export const WorksheetSubmitButton: React.FC<WorksheetSubmitButtonProps> = ({
  isSubmitting,
  onSubmit,
  mode,
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
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              {mode === "create" ? "Tworzenie..." : "Zapisywanie..."}
            </>
          ) : (
            <>
              <PenIcon className="w-4 h-4 mr-2" />
              {mode === "create" ? "Utwórz próbę" : "Zapisz zmiany"}
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

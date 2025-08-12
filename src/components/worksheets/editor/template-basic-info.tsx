import { Card, CardContent } from "@/components/ui/card";
import { FileInput } from "@/components/ui/file-input";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { Organization } from "@/types/team";
import { User } from "@/types/user";
import { InfoIcon } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface WorksheetBasicInfoProps {
  form: UseFormReturn<WorksheetWithTasks>;
  currentUser: User;
}

export const TemplateWorksheetBasicInfo: React.FC<WorksheetBasicInfoProps> = ({
  form,
  currentUser,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="scope"
            render={({ field }) => (
              <FormItem>
                <Label>Dla kogo jest ten szablon? *</Label>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <Label htmlFor="team" className="text-sm">
                      Dla mojej drużyny{" "}
                      {currentUser.teamName && `(${currentUser.teamName})`}
                    </Label>
                  </div>
                  {currentUser.isStaff && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organization" id="organization" />
                      <Label htmlFor="organization" className="text-sm">
                        Dla mojej organizacji{" "}
                        {currentUser.organization === Organization.Male
                          ? "(Harcerze)"
                          : "(Harcerki)"}
                      </Label>
                    </div>
                  )}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Nazwa *</Label>
                <Input placeholder="np. Wywiadowca" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label>Opis</Label>
                <Textarea
                  placeholder="Jeśli chcesz, możesz opisać tę próbę."
                  rows={2}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="templateNotes"
            render={({ field }) => (
              <FormItem>
                <Label>Notatka</Label>
                <Textarea
                  placeholder="Notatka - widoczna do momentu utworzenie próby z szablonu."
                  rows={2}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <Label>Obrazek szablonu</Label>
                <FileInput
                  value={field.value || null}
                  onChange={field.onChange}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/svg+xml"
                  maxSizeInMB={5}
                  preview={true}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Priorytet
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="text-muted-foreground size-3" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Im wyższy, tym szablon będzie wyżej na liście szablonów.
                      Jeśli priorytet jest taki sam jak innego szablonu, to
                      szablony będą sortowane alfabetycznie.
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="0"
                  min={0}
                  max={100}
                  step={1}
                  onWheel={(e) => e.currentTarget.blur()} // Prevents scrolling the input value\
                  onKeyDown={(e) => {
                    if (e.key === "e" || e.key === "E") {
                      e.preventDefault(); // Prevents entering scientific notation
                    }
                  }}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

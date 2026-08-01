import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
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
import { Controller, UseFormReturn } from "react-hook-form";

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
          <Controller
            control={form.control}
            name="scope"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Dla kogo jest ten szablon? *</FieldLabel>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nazwa *</FieldLabel>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="np. Wywiadowca"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Opis</FieldLabel>
                <Textarea
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Jeśli chcesz, możesz opisać tę próbę."
                  rows={2}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="templateNotes"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Notatka</FieldLabel>
                <Textarea
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Notatka - widoczna do momentu utworzenie próby z szablonu."
                  rows={2}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="image"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Obrazek szablonu</FieldLabel>
                <FileInput
                  id={field.name}
                  value={field.value || null}
                  onChange={field.onChange}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/svg+xml"
                  maxSizeInMB={5}
                  preview={true}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="priority"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
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
                </FieldLabel>
                <Input
                  id={field.name}
                  aria-invalid={fieldState.invalid}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

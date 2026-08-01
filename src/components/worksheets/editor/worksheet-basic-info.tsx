import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserCombobox } from "@/components/user-combobox";
import { FinalChallengeSuggestionsDialog } from "@/components/worksheets/editor/final-challenge-suggestions-dialog";
import { RequiredFunctionLevel } from "@/lib/const";
import { type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { Organization } from "@/types/team";
import { User } from "@/types/user";
import { InfoIcon, SparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

interface WorksheetBasicInfoProps {
  form: UseFormReturn<WorksheetWithTasks>;
  currentUser: User;
}

export const WorksheetBasicInfo: React.FC<WorksheetBasicInfoProps> = ({
  form,
  currentUser,
}) => {
  const [showFinalChallengeSuggestions, setShowFinalChallengeSuggestions] =
    useState(false);
  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {currentUser.function.numberValue >=
            RequiredFunctionLevel.WORKSHEET_MANAGEMENT && (
            <Controller
              control={form.control}
              name="userId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Dla kogo jest ta próba? *</FieldLabel>
                  <UserCombobox
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    placeholder="Wyszukaj użytkownika..."
                    allowsOutsideUserTeamSearch={
                      currentUser.function.numberValue >=
                      RequiredFunctionLevel.OUTSIDE_TEAM_WORKSHEET_CREATION
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

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

          <Accordion
            defaultValue={form.getValues("supervisor") ? ["supervisor"] : []}
          >
            <AccordionItem value="supervisor">
              <AccordionTrigger className="py-0">Opiekun</AccordionTrigger>
              <AccordionContent className="pb-0">
                <Controller
                  control={form.control}
                  name="supervisor"
                  render={({ field, fieldState }) => (
                    <Field className="pt-2" data-invalid={fieldState.invalid}>
                      <UserCombobox
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        placeholder="Wyszukaj opiekuna..."
                        allowsOutsideUserTeamSearch={true}
                        excludeUserIds={
                          form.watch("userId")
                            ? [String(form.watch("userId"))]
                            : []
                        }
                      />
                      <FieldDescription>Dla prób z kapitułą</FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            defaultValue={
              form.getValues("finalChallenge") ||
              form.getValues("finalChallengeDescription")
                ? ["finalChallenge"]
                : []
            }
          >
            <AccordionItem value="finalChallenge">
              <AccordionTrigger className="py-0">
                Próba końcowa
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="flex items-center gap-2 pt-2">
                  <Controller
                    control={form.control}
                    name="finalChallenge"
                    render={({ field, fieldState }) => (
                      <Field
                        className="flex-1"
                        data-invalid={fieldState.invalid}
                      >
                        <Input
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  {currentUser.function.numberValue >=
                    RequiredFunctionLevel.FINAL_CHALLENGE_SUGGESTIONS &&
                    currentUser.organization === Organization.Male && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setShowFinalChallengeSuggestions(true);
                        }}
                        className="bg-blue-100 text-blue-700 opacity-100 hover:bg-blue-200 hover:text-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 dark:hover:text-blue-200"
                        title="Pomysły na zadania"
                      >
                        <SparklesIcon className="size-4" />
                      </Button>
                    )}
                </div>
                <Controller
                  control={form.control}
                  name="finalChallengeDescription"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Opis próby końcowej
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        rows={2}
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {form.getValues("templateNotes") && (
            <Alert>
              <InfoIcon />
              <AlertDescription className="whitespace-pre-wrap">
                {form.getValues("templateNotes")}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>

      <FinalChallengeSuggestionsDialog
        open={showFinalChallengeSuggestions}
        onOpenChange={(open) => {
          setShowFinalChallengeSuggestions(open);
        }}
        onAddFinalChallenge={(suggestion) => {
          form.setValue("finalChallenge", suggestion.name);
          form.setValue("finalChallengeDescription", suggestion.description);
        }}
      />
    </Card>
  );
};

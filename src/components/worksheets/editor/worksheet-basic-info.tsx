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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCombobox } from "@/components/user-combobox";
import { FinalChallengeSuggestionsDialog } from "@/components/worksheets/editor/final-challenge-suggestions-dialog";
import { RequiredFunctionLevel } from "@/lib/const";
import { type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { User } from "@/types/user";
import { InfoIcon, SparklesIcon } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

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
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <Label>Dla kogo jest ta próba? *</Label>
                  <UserCombobox
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    placeholder="Wyszukaj użytkownika..."
                    allowsOutsideUserTeamSearch={
                      currentUser.function.numberValue >=
                      RequiredFunctionLevel.OUTSIDE_TEAM_WORKSHEET_CREATION
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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

          <Accordion
            type="single"
            collapsible
            defaultValue={form.getValues("supervisor") ? "supervisor" : ""}
          >
            <AccordionItem value="supervisor">
              <AccordionTrigger className="py-0">Opiekun</AccordionTrigger>
              <AccordionContent className="pb-0">
                <FormField
                  control={form.control}
                  name="supervisor"
                  render={({ field }) => (
                    <FormItem className="pt-2">
                      <UserCombobox
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        placeholder="Wyszukaj opiekuna..."
                        allowsOutsideUserTeamSearch={true}
                        excludeUserIds={[currentUser.id]}
                      />
                      <FormDescription>Dla prób z kapitułą</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion
            type="single"
            collapsible
            defaultValue={
              form.getValues("finalChallenge") ||
              form.getValues("finalChallengeDescription")
                ? "finalChallenge"
                : ""
            }
          >
            <AccordionItem value="finalChallenge">
              <AccordionTrigger className="py-0">
                Próba końcowa
              </AccordionTrigger>
              <AccordionContent
                className="space-y-4"
                containerClassName="overflow-visible"
              >
                <div className="flex items-center gap-2 pt-2">
                  <FormField
                    control={form.control}
                    name="finalChallenge"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Input {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {currentUser.function.numberValue >=
                    RequiredFunctionLevel.FINAL_CHALLENGE_SUGGESTIONS && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowFinalChallengeSuggestions(true);
                      }}
                      className="bg-blue-100 text-blue-700 opacity-100 hover:bg-blue-200 hover:text-blue-800 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 dark:hover:text-blue-400"
                      title="Pomysły na zadania"
                    >
                      <SparklesIcon className="size-4" />
                    </Button>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="finalChallengeDescription"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Opis próby końcowej</Label>
                      <Textarea rows={2} {...field} />
                      <FormMessage />
                    </FormItem>
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

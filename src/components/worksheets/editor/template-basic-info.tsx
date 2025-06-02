import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { UserCombobox } from "@/components/user-combobox";
import { User } from "@/types/user";
import { RequiredFunctionLevel } from "@/lib/const";

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
          {currentUser.function.numberValue >=
            RequiredFunctionLevel.WORKSHEET_MANAGEMENT && (
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium">
                    Dla kogo jest ta próba? *
                  </label>
                  <UserCombobox
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    placeholder="Wyszukaj użytkownika..."
                    searchEndpoint="/users/search/"
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
                <label className="text-sm font-medium">Nazwa *</label>
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
                <label className="text-sm font-medium">Opis</label>
                <Textarea
                  placeholder="Jeśli chcesz, możesz opisać tę próbę."
                  rows={2}
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

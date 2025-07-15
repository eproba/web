import { Card, CardContent } from "@/components/ui/card";
import { FileInput } from "@/components/ui/file-input";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { Organization } from "@/types/team";
import { User } from "@/types/user";
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
                <label className="text-sm font-medium">
                  Dla kogo jest ten szablon? *
                </label>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="team" id="team" />
                    <label htmlFor="team" className="text-sm">
                      Dla mojej drużyny{" "}
                      {currentUser.teamName && `(${currentUser.teamName})`}
                    </label>
                  </div>
                  {currentUser.isStaff && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organization" id="organization" />
                      <label htmlFor="organization" className="text-sm">
                        Dla mojej organizacji{" "}
                        {currentUser.organization === Organization.Male
                          ? "(Harcerze)"
                          : "(Harcerki)"}
                      </label>
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

          <FormField
            control={form.control}
            name="templateNotes"
            render={({ field }) => (
              <FormItem>
                <label className="text-sm font-medium">Notatka</label>
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
                <label className="text-sm font-medium">Obrazek szablonu</label>
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
        </div>
      </CardContent>
    </Card>
  );
};

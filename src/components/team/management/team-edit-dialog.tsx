import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Team } from "@/types/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, { error: "Nazwa drużyny jest wymagana." }),
  shortName: z.string().min(1, { error: "Skrócona nazwa jest wymagana." }),
});

interface TeamEditDialogProps {
  team: Team;
  children: React.ReactElement;
  onTeamUpdate: (name: string, shortName: string) => Promise<boolean>;
}

export function TeamEditDialog({
  team,
  children,
  onTeamUpdate,
}: TeamEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: team.name,
      shortName: team.shortName,
    },
  });

  const onSubmit = async (values: z.output<typeof formSchema>) => {
    setIsLoading(true);
    const updated = await onTeamUpdate(values.name, values.shortName);
    if (updated) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    form.reset({
      name: team.name,
      shortName: team.shortName,
    });
  }, [team, form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger render={children} />
      <DialogContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edytuj dane drużyny</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nazwa drużyny</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="shortName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Skrócona nazwa</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Anuluj
                  </Button>
                }
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Zapisywanie..." : "Zapisz"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

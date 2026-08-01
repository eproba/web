import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Patrol } from "@/types/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, { error: "Nazwa zastępu jest wymagana." }),
});

interface PatrolEditDialogProps {
  patrol: Patrol;
  children: React.ReactElement;
  onPatrolUpdate: (patrolId: string, name: string) => Promise<boolean>;
  onPatrolDelete: (patrolId: string) => Promise<boolean>;
  allowDelete: boolean;
  isLastPatrol: boolean;
}

export function PatrolEditDialog({
  patrol,
  children,
  onPatrolUpdate,
  onPatrolDelete,
  allowDelete,
  isLastPatrol,
}: PatrolEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: patrol.name,
    },
  });

  const onSubmit = async (values: z.output<typeof formSchema>) => {
    setIsLoading(true);
    const updated = await onPatrolUpdate(patrol.id, values.name);
    if (updated) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!allowDelete) return;
    setIsDeleting(true);
    const deleted = await onPatrolDelete(patrol.id);
    if (deleted) {
      setIsOpen(false);
    }
    setIsDeleting(false);
  };

  useEffect(() => {
    form.reset({
      name: patrol.name,
    });
  }, [patrol, form]);

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
              <DialogTitle>Edytuj zastęp</DialogTitle>
              {!allowDelete && (
                <DialogDescription className="text-muted-foreground hidden text-xs pointer-coarse:block">
                  {isLastPatrol
                    ? "W drużynie musi być przynajmniej jeden zastęp."
                    : "Tylko pusty zastęp może zostać usunięty."}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nazwa zastępu</FieldLabel>

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
              <div className="flex w-full items-center justify-between gap-4">
                {allowDelete ? (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Usuwanie..." : "Usuń zastęp"}
                  </Button>
                ) : (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          type="button"
                          variant="destructive"
                          disabled
                          className="cursor-not-allowed disabled:pointer-events-auto"
                        >
                          Usuń zastęp
                        </Button>
                      }
                    />
                    <TooltipContent>
                      {isLastPatrol
                        ? "Nie można usunąć ostatniego zastępu"
                        : "Nie można usunąć zastępu z aktywnymi członkami"}
                    </TooltipContent>
                  </Tooltip>
                )}
                <div className="flex items-center gap-2">
                  <DialogClose
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                      >
                        Anuluj
                      </Button>
                    }
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Zapisywanie..." : "Zapisz"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

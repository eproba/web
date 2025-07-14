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
import { Button } from "@/components/ui/button";
import { Patrol } from "@/types/team";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  name: z.string().min(1, "Nazwa zastępu jest wymagana."),
});

interface PatrolEditDialogProps {
  patrol: Patrol;
  children: React.ReactNode;
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: patrol.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edytuj zastęp</DialogTitle>
              {!allowDelete && (
                <DialogDescription className="hidden pointer-coarse:block text-xs text-muted-foreground">
                  {isLastPatrol
                    ? "W drużynie musi być przynajmniej jeden zastęp."
                    : "Tylko pusty zastęp może zostać usunięty."}
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa zastępu</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <div className="flex justify-between items-center w-full gap-4">
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
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        disabled
                        className="cursor-not-allowed disabled:pointer-events-auto"
                      >
                        Usuń zastęp
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isLastPatrol
                        ? "Nie można usunąć ostatniego zastępu"
                        : "Nie można usunąć zastępu z aktywnymi członkami"}
                    </TooltipContent>
                  </Tooltip>
                )}
                <div className="flex gap-2 items-center">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                    >
                      Anuluj
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Zapisywanie..." : "Zapisz"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

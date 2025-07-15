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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Team } from "@/types/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { error: "Nazwa drużyny jest wymagana." }),
  shortName: z.string().min(1, { error: "Skrócona nazwa jest wymagana." }),
});

interface TeamEditDialogProps {
  team: Team;
  children: React.ReactNode;
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edytuj dane drużyny</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa drużyny</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skrócona nazwa</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Anuluj
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Zapisywanie..." : "Zapisz"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

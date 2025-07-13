import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InstructorRank, ScoutRank, User, UserFunction } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Organization, Patrol } from "@/types/team";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiUserResponse } from "@/lib/serializers/user";
import { capitalizeFirstLetter } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  nickname: z.string().optional(),
  email: z
    .string()
    .min(1, "Email jest wymagany.")
    .email("Nieprawidłowy adres email."),
  patrol: z.string().optional(),
  function: z.coerce.number().min(0).max(5),
  scoutRank: z.coerce.number().min(0).max(6),
  instructorRank: z.coerce.number().min(0).max(3),
});

type FormSchema = z.infer<typeof formSchema>;

interface UserEditDialogProps {
  user: User;
  patrols: Patrol[];
  onUserUpdate: (
    userId: string,
    updatedUser: Partial<ApiUserResponse>,
  ) => Promise<boolean>;
  children: React.ReactNode;
  currentUser: User;
}

export function UserEditDialog({
  user,
  patrols,
  onUserUpdate,
  children,
  currentUser,
}: UserEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      nickname: user.nickname ?? "",
      email: user.email,
      patrol: user.patrol ?? undefined,
      function: user.function.numberValue ?? 0,
      scoutRank: user.scoutRank.numberValue ?? 0,
      instructorRank: user.instructorRank.numberValue ?? 0,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setIsLoading(true);
    const updated = await onUserUpdate(user.id, {
      first_name: values.firstName ?? null,
      last_name: values.lastName ?? null,
      nickname: values.nickname ?? null,
      email: values.email,
      patrol: values.patrol ?? undefined,
      function: values.function,
      scout_rank: values.scoutRank,
      instructor_rank: values.scoutRank >= 5 ? values.instructorRank : 0,
    });
    if (updated) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                Edytuj{" "}
                {user.organization === Organization.Female
                  ? "harcerkę"
                  : "harcerza"}
              </DialogTitle>
              {!user.isActive && (
                <DialogDescription>
                  Konto jest dezaktywowane: Ta osoba nie ma dostępu do
                  aplikacji. Możesz aktywować konto, aby przywrócić dostęp.
                </DialogDescription>
              )}
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię i nazwisko</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pseudonim</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patrol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zastęp</FormLabel>
                    <FormControl>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz zastęp" />
                          </SelectTrigger>
                          <SelectContent>
                            {patrols.map((patrol) => (
                              <SelectItem key={patrol.id} value={patrol.id}>
                                {patrol.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="function"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funkcja</FormLabel>
                    <FormControl>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz zastęp" />
                          </SelectTrigger>
                          <SelectContent>
                            {UserFunction.values
                              .filter(
                                (fn) =>
                                  fn.value <=
                                    currentUser.function.numberValue ||
                                  currentUser.function.value >= 4,
                              )
                              .map((fn) => (
                                <SelectItem
                                  key={fn.value}
                                  value={fn.value.toString()}
                                >
                                  {user.organization === Organization.Female
                                    ? fn.female
                                    : fn.male}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2 w-full">
                <FormField
                  control={form.control}
                  name="scoutRank"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Stopień harcerski</FormLabel>
                      <FormControl>
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Wybierz stopień" />
                            </SelectTrigger>
                            <SelectContent>
                              {ScoutRank.values.map((rank) => (
                                <SelectItem
                                  key={rank.value}
                                  value={rank.value.toString()}
                                >
                                  {capitalizeFirstLetter(
                                    user.organization === Organization.Female
                                      ? rank.female
                                      : rank.male,
                                  )}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("scoutRank") >= 5 && (
                  <FormField
                    control={form.control}
                    name="instructorRank"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Stopień instruktorski</FormLabel>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value.toString()}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Wybierz stopień" />
                              </SelectTrigger>
                              <SelectContent>
                                {InstructorRank.values.map((rank) => (
                                  <SelectItem
                                    key={rank.value}
                                    value={rank.value.toString()}
                                  >
                                    {capitalizeFirstLetter(
                                      user.organization === Organization.Female
                                        ? rank.female
                                        : rank.male,
                                    )}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <DialogFooter>
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

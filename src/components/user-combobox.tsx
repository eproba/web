"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApi } from "@/lib/api-client";
import { publicUserSerializer } from "@/lib/serializers/user";
import { cn } from "@/lib/utils";
import { PublicUser } from "@/types/user";
import { CheckIcon, ChevronsUpDownIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface UserComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  allowsOutsideUserTeamSearch?: boolean;
  excludeUserIds?: string[];
}

export function UserCombobox({
  value,
  onValueChange,
  placeholder = "Wybierz użytkownika...",
  disabled = false,
  className,
  allowsOutsideUserTeamSearch = false,
  excludeUserIds = [],
}: UserComboboxProps) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOutsideTeam, setSearchOutsideTeam] = useState(false);
  const { apiClient, isApiReady } = useApi();

  const selectedUser = users.find((user) => user.id === value);

  const debouncedSearch = useDebouncedCallback(async (query: string) => {
    setIsLoading(true);

    try {
      const response = await apiClient(
        `/users/search/?q=${encodeURIComponent(query)}&outside_team=${searchOutsideTeam}`,
      );
      const data = (await response.json()).map(
        publicUserSerializer,
      ) as PublicUser[];
      setUsers(
        data.filter((user) => {
          return !excludeUserIds.includes(user.id);
        }),
      );
    } catch (error) {
      console.error("Failed to search users:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (searchQuery) {
      if (!isApiReady || searchQuery.trim().length < 3) {
        setUsers([]);
      } else if (searchQuery.trim().length >= 3) {
        setIsLoading(true);
        debouncedSearch(searchQuery);
      }
    } else {
      setUsers([]);
    }
  }, [searchQuery, debouncedSearch, searchOutsideTeam, isApiReady]);

  // If we have a selected value but no user data, try to fetch it
  useEffect(() => {
    if (value && !selectedUser && isApiReady) {
      setIsLoading(true);
      const fetchSelectedUser = async () => {
        try {
          const response = await apiClient(`/users/${value}/`);
          const userData = publicUserSerializer(await response.json());
          setUsers((prev) => [
            ...prev.filter((u) => u.id !== userData.id),
            userData,
          ]);
        } catch (error) {
          console.error("Failed to fetch selected user:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSelectedUser();
    } else if (!value) {
      setIsLoading(false);
    }
  }, [value, selectedUser, isApiReady, apiClient]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <UserIcon className="text-muted-foreground size-4" />
            {selectedUser ? (
              <span className="truncate">{selectedUser.displayName}</span>
            ) : value ? (
              isLoading ? (
                <span className="text-muted-foreground">Ładowanie...</span>
              ) : (
                <span className="text-muted-foreground">
                  Nie znaleziono użytkownika
                </span>
              )
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <div className="flex items-center [&>[data-slot=command-input-wrapper]]:w-full">
            <CommandInput
              placeholder="Wyszukaj użytkownika..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </div>
          <CommandList>
            {isLoading ? (
              <div className="text-muted-foreground p-4 text-center text-sm">
                Wyszukiwanie...
              </div>
            ) : searchQuery.trim().length < 3 && !selectedUser ? (
              <div className="text-muted-foreground p-4 text-center text-sm">
                Wpisz co najmniej 3 znaki aby wyszukać
              </div>
            ) : users.length === 0 ? (
              <CommandEmpty>Nie znaleziono użytkowników.</CommandEmpty>
            ) : (
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={() => {
                      onValueChange?.(user.id === value ? "" : user.id);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon className="text-muted-foreground size-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{user.displayName}</span>
                        {user.patrolName && (
                          <span className="text-muted-foreground text-xs">
                            {searchOutsideTeam
                              ? `${user.teamName} - ${user.patrolName}`
                              : user.patrolName}
                          </span>
                        )}
                      </div>
                    </div>
                    <CheckIcon
                      className={cn(
                        "size-4",
                        value === user.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {allowsOutsideUserTeamSearch && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground w-full justify-start text-xs"
                  onClick={() => setSearchOutsideTeam(!searchOutsideTeam)}
                >
                  {!searchOutsideTeam
                    ? "Szukaj również poza twoją drużyną"
                    : "Szukaj tylko w twojej drużynie"}
                </Button>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

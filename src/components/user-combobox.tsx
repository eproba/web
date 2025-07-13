"use client";

import {
  CheckIcon,
  ChevronsUpDownIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
import { PublicUser } from "@/types/user";
import { publicUserSerializer } from "@/lib/serializers/user";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

interface UserComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchEndpoint?: string;
  disabled?: boolean;
  className?: string;
}

export function UserCombobox({
  value,
  onValueChange,
  placeholder = "Wybierz użytkownika...",
  searchEndpoint = "/users/search/",
  disabled = false,
  className,
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
        `${searchEndpoint}?q=${encodeURIComponent(query)}&outside_team=${searchOutsideTeam}`,
      );
      const data = (await response.json()).map(publicUserSerializer);
      setUsers(data);
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
            <UserIcon className="size-4 text-muted-foreground" />
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
          <div className="flex items-center border-b px-3 [&>[data-slot=command-input-wrapper]]:w-full">
            <SearchIcon className="mr-2 size-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Wyszukaj użytkownika..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="border-0 focus:ring-0"
            />
          </div>
          <CommandList>
            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Wyszukiwanie...
              </div>
            ) : searchQuery.trim().length < 3 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
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
                      <UserIcon className="size-4 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="font-medium">{user.displayName}</span>
                        {user.patrolName && (
                          <span className="text-xs text-muted-foreground">
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
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-xs text-muted-foreground"
                onClick={() => setSearchOutsideTeam(!searchOutsideTeam)}
              >
                {!searchOutsideTeam
                  ? "Szukaj również poza drużyną"
                  : "Szukaj tylko w drużynie"}
              </Button>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

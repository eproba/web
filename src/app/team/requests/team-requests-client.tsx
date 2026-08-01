"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import {
  ApiTeamRequestResponse,
  teamRequestSerializer,
} from "@/lib/serializers/team-request";
import { ToastMsg } from "@/lib/toast-msg";
import { TeamRequest } from "@/types/team-request";
import { FieldInfo, UserFunction } from "@/types/user";
import {
  AlertCircleIcon,
  CalendarIcon,
  FilterIcon,
  LoaderCircleIcon,
  MailIcon,
  MapPinIcon,
  RotateCcwIcon,
  SearchIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShieldQuestionIcon,
  ShieldXIcon,
  UsersIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type FilterStatus =
  | "all"
  | "submitted"
  | "pending_verification"
  | "approved"
  | "rejected"
  | "submitted_pending_verification";

const STATUS_LABELS = {
  submitted: "Zgłoszone",
  pending_verification: "Oczekuje na weryfikację",
  approved: "Zaakceptowane",
  rejected: "Odrzucone",
} as const;

const STATUS_COLORS = {
  submitted: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  pending_verification:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  approved:
    "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
} as const;

const filterStatusItems = [
  {
    label: "Zgłoszone / Oczekuje na weryfikację",
    value: "submitted_pending_verification",
  },
  { label: "Wszystkie", value: "all" },
  { label: "Zgłoszone", value: "submitted" },
  { label: "Oczekuje na weryfikację", value: "pending_verification" },
  { label: "Zaakceptowane", value: "approved" },
  { label: "Odrzucone", value: "rejected" },
] satisfies ReadonlyArray<{ label: string; value: FilterStatus }>;

type TeamRequestAction =
  "approve" | "reject" | "request-verification" | "reopen";

const ACTION_CONTENT = {
  approve: {
    label: "Zatwierdź",
    title: "Zatwierdzić drużynę?",
    description:
      "Drużyna zostanie aktywowana, a wnioskodawca otrzyma wybraną funkcję.",
    success: "Zgłoszenie zostało zatwierdzone",
  },
  reject: {
    label: "Odrzuć",
    title: "Odrzucić zgłoszenie?",
    description:
      "Drużyna pozostanie nieaktywna. Tę decyzję można później zmienić.",
    success: "Zgłoszenie zostało odrzucone",
  },
  "request-verification": {
    label: "Poproś o weryfikację",
    title: "Poprosić o dodatkową weryfikację?",
    description:
      "Zgłoszenie zostanie oznaczone jako oczekujące na dodatkowe informacje.",
    success: "Zgłoszenie oczekuje na weryfikację",
  },
  reopen: {
    label: "Otwórz ponownie",
    title: "Otworzyć zgłoszenie ponownie?",
    description: "Zgłoszenie wróci do kolejki do rozpatrzenia.",
    success: "Zgłoszenie zostało otwarte ponownie",
  },
} satisfies Record<
  TeamRequestAction,
  { label: string; title: string; description: string; success: string }
>;

interface TeamRequestsClientProps {
  initialRequests: TeamRequest[];
}

export function TeamRequestsClient({
  initialRequests,
}: TeamRequestsClientProps) {
  const [requests, setRequests] = useState<TeamRequest[]>(initialRequests);
  const [filteredRequests, setFilteredRequests] = useState<TeamRequest[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    "submitted_pending_verification",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { apiClient } = useApi();
  const isFirstRender = useRef(true);

  const debouncedSearch = useDebouncedCallback((term: string) => {
    setDebouncedSearchTerm(term);
  }, 300);

  const filteredRequestsMemo = useMemo(() => {
    let filtered = requests;

    if (filterStatus === "submitted_pending_verification") {
      filtered = filtered.filter(
        (req) =>
          req.status === "submitted" || req.status === "pending_verification",
      );
    } else if (filterStatus !== "all") {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.team.name.toLowerCase().includes(searchLower) ||
          req.team.shortName.toLowerCase().includes(searchLower) ||
          req.createdBy.displayName.toLowerCase().includes(searchLower) ||
          req.createdBy.email.toLowerCase().includes(searchLower) ||
          req.team.district?.name.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [requests, filterStatus, debouncedSearchTerm]);

  useEffect(() => {
    if (isFirstRender.current) {
      setFilteredRequests(filteredRequestsMemo);
      isFirstRender.current = false;
      return;
    }

    setIsFiltering(true);
    setFilteredRequests(filteredRequestsMemo);

    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredRequestsMemo]);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setIsFiltering(true);
    },
    [],
  );

  const handleFilterStatusChange = useCallback((value: FilterStatus) => {
    setIsFiltering(true);
    setFilterStatus(value);
  }, []);

  const handleAction = async (
    requestId: string,
    action: TeamRequestAction,
    note: string,
    sendEmail: boolean,
    sendNote: boolean,
  ) => {
    try {
      setProcessingIds((prev) => new Set(prev).add(requestId));

      const response = await apiClient(
        `/team-requests/${requestId}/${action}/`,
        {
          method: "POST",
          body: JSON.stringify({
            note,
            send_email: sendEmail,
            send_note: sendNote,
          }),
        },
      );
      const updatedRequest = teamRequestSerializer(
        (await response.json()) as ApiTeamRequestResponse,
      );

      toast.add({ title: ACTION_CONTENT[action].success, type: "success" });
      setRequests((prev) =>
        prev.map((req) => (req.id === requestId ? updatedRequest : req)),
      );
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie udało się zaktualizować zgłoszenia",
            description: error as Error,
          },
        }),
        type: "error",
      });
      console.error("Error updating team request:", error);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFunctionLevelName = (
    level: number,
    gender: FieldInfo<string> | null,
  ) => {
    return UserFunction.fromValue(level, gender).fullName;
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <FilterIcon className="text-muted-foreground size-4" />
          <Select
            items={filterStatusItems}
            value={filterStatus}
            onValueChange={(value) => {
              if (value !== null) {
                handleFilterStatusChange(value);
              }
            }}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Filtruj po statusie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filterStatusItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-1 items-center gap-2">
          <div className="relative">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Szukaj po nazwie drużyny, wnioskodawcy, e-mailu..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-sm pr-10 pl-10"
            />
            {isFiltering && searchTerm && (
              <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                <div className="border-muted-foreground size-4 animate-spin rounded-full border-2 border-t-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>

      {isFiltering && (
        <div className="mb-6 flex items-center gap-2">
          <p className="text-muted-foreground text-sm">
            <span className="flex items-center gap-2">
              <LoaderCircleIcon className="size-4 animate-spin" />
              Filtrowanie...
            </span>
          </p>
        </div>
      )}

      {isFiltering ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-muted-foreground text-center">
              <UsersIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>Brak zgłoszeń pasujących do filtra</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredRequests.map((request) => (
            <TeamRequestCard
              key={request.id}
              request={request}
              onAction={handleAction}
              isProcessing={processingIds.has(request.id)}
              formatDate={formatDate}
              getFunctionLevelName={getFunctionLevelName}
            />
          ))}
        </div>
      )}
    </>
  );
}

interface TeamRequestCardProps {
  request: TeamRequest;
  onAction: (
    requestId: string,
    action: TeamRequestAction,
    note: string,
    sendEmail: boolean,
    sendNote: boolean,
  ) => void;
  isProcessing: boolean;
  formatDate: (date: Date) => string;
  getFunctionLevelName: (
    level: number,
    gender: FieldInfo<string> | null,
  ) => string;
}

function TeamRequestCard({
  request,
  onAction,
  isProcessing,
  formatDate,
  getFunctionLevelName,
}: TeamRequestCardProps) {
  const [note, setNote] = useState(request.notes || "");
  const [sendEmail, setSendEmail] = useState(true);
  const [sendNote, setSendNote] = useState(false);
  const [pendingAction, setPendingAction] = useState<TeamRequestAction | null>(
    null,
  );

  const handleConfirmedAction = () => {
    if (!pendingAction) return;
    onAction(request.id, pendingAction, note, sendEmail, sendNote);
    setPendingAction(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{request.team.name}</CardTitle>
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <span className="font-medium">{request.team.shortName}</span>
              {request.team.district && (
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-3 w-3" />
                  <span>{request.team.district.name}</span>
                </div>
              )}
            </div>
          </div>
          <Badge className={STATUS_COLORS[request.status]}>
            {STATUS_LABELS[request.status]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="mb-3 flex items-center gap-2 font-medium">
            <ShieldIcon className="size-4" />
            Wnioskodawca
          </h4>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <span className="font-medium">Imię i nazwisko:</span>
              <div className="mt-1">{request.createdBy.displayName}</div>
            </div>
            <div>
              <span className="font-medium">E-mail:</span>
              <div className="mt-1 flex items-center gap-2">
                <MailIcon className="text-muted-foreground h-3 w-3" />
                <span>{request.createdBy.email}</span>
                {!request.createdBy.emailVerified && (
                  <Badge variant="destructive" className="text-xs">
                    Nie zweryfikowany
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <span className="font-medium">Funkcja:</span>
              <div className="mt-1">
                {getFunctionLevelName(
                  request.requestedFunctionLevel,
                  request.createdBy.gender,
                )}
              </div>
            </div>
            <div>
              <span className="font-medium">Data zgłoszenia:</span>
              <div className="mt-1 flex items-center gap-2">
                <CalendarIcon className="text-muted-foreground h-3 w-3" />
                <span>{formatDate(request.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="mb-3 flex items-center gap-2 font-medium">
            <UsersIcon className="size-4" />
            Informacje o drużynie
          </h4>
          <div className="space-y-2 text-sm">
            {request.team.patrols && request.team.patrols.length > 0 && (
              <div>
                <span className="font-medium">Zastępy:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {request.team.patrols.map((patrol, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {patrol.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {!request.createdBy.emailVerified && (
          <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
            <AlertCircleIcon className="size-4 text-yellow-600 dark:text-yellow-400" />
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              Uwaga: Wnioskodawca nie zweryfikował swojego adresu e-mail
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 border-t pt-6">
          <div>
            <Label
              htmlFor={`note-${request.id}`}
              className="text-sm font-medium"
            >
              Notatka
            </Label>
            <Textarea
              id={`note-${request.id}`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dodaj notatkę (opcjonalnie)"
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`send-email-${request.id}`}
                checked={sendEmail}
                onCheckedChange={(checked: boolean) => {
                  setSendEmail(checked);
                  if (!checked) setSendNote(false);
                }}
              />
              <Label htmlFor={`send-email-${request.id}`} className="text-sm">
                Wyślij e-mail z powiadomieniem
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`send-note-${request.id}`}
                checked={sendNote}
                disabled={!sendEmail || !note.trim()}
                onCheckedChange={(checked: boolean) => setSendNote(checked)}
              />
              <Label htmlFor={`send-note-${request.id}`} className="text-sm">
                Wyślij notatkę mailem
              </Label>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
            {request.status !== "submitted" && (
              <Button
                variant="ghost"
                onClick={() => setPendingAction("reopen")}
                disabled={isProcessing}
              >
                <RotateCcwIcon />
                Otwórz ponownie
              </Button>
            )}
            {request.status !== "pending_verification" && (
              <Button
                variant="outline"
                onClick={() => setPendingAction("request-verification")}
                disabled={isProcessing || !sendEmail}
                title={
                  sendEmail
                    ? undefined
                    : "Włącz powiadomienie e-mail, aby poprosić o weryfikację"
                }
              >
                <ShieldQuestionIcon />
                Poproś o weryfikację
              </Button>
            )}
            {request.status !== "rejected" && (
              <Button
                variant="destructive"
                onClick={() => setPendingAction("reject")}
                disabled={isProcessing}
              >
                <ShieldXIcon />
                Odrzuć
              </Button>
            )}
            {request.status !== "approved" && (
              <Button
                onClick={() => setPendingAction("approve")}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  <ShieldCheckIcon />
                )}
                Zatwierdź
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <AlertDialog
        open={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open) setPendingAction(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingAction ? ACTION_CONTENT[pendingAction].title : ""}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction ? ACTION_CONTENT[pendingAction].description : ""}
              {sendEmail && (
                <span className="mt-2 block">
                  Wnioskodawca otrzyma powiadomienie e-mail
                  {sendNote && note.trim() ? " wraz z notatką" : ""}.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction
              variant={pendingAction === "reject" ? "destructive" : "default"}
              onClick={handleConfirmedAction}
            >
              {pendingAction
                ? ACTION_CONTENT[pendingAction].label
                : "Potwierdź"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

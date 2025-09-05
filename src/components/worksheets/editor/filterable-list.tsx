import { MultiSelect } from "@/components/multi-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FilterableItem,
  FilterableListProps,
} from "@/types/filterable-components";
import { useVirtualizer } from "@tanstack/react-virtual";
import { GraduationCapIcon, PlusIcon, SearchIcon } from "lucide-react";
import React, { useMemo, useState } from "react";

interface VirtualizedListProps<T> {
  items: { raw: T }[];
  itemSize: number;
  overscan: number;
  render: (item: T, onSelect?: () => void) => React.ReactNode;
  onSelectFactory?: (item: T) => (() => void) | undefined;
}

function VirtualizedList<T>({
  items,
  itemSize,
  overscan,
  render,
  onSelectFactory,
}: VirtualizedListProps<T>) {
  const [viewportEl, setViewportEl] = React.useState<HTMLElement | null>(null);
  const containerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      const vp = node.closest<HTMLElement>(
        "[data-slot='scroll-area-viewport']",
      );
      if (vp && vp !== viewportEl) setViewportEl(vp);
    },
    [viewportEl],
  );

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => viewportEl,
    estimateSize: () => itemSize,
    overscan,
    // Provide a key for stability if items may reorder; fallback to index.
    getItemKey: (index) => {
      const raw = items[index]?.raw as unknown as
        | { id?: string | number; name?: string }
        | undefined;
      return (raw && (raw.id ?? raw.name)) ?? index;
    },
  });

  // Fallback render (non-virtualized) until viewport is resolved to avoid blank area.
  if (!viewportEl) {
    return (
      <div ref={containerRef} className="space-y-2">
        {items.slice(0, 30).map((it, i) => {
          const onSelect = onSelectFactory
            ? onSelectFactory(it.raw)
            : undefined;
          return (
            <React.Fragment key={i}>{render(it.raw, onSelect)}</React.Fragment>
          );
        })}
        {items.length > 30 && (
          <div className="text-muted-foreground text-center text-xs">
            Ładowanie widoku listy...
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((vi) => {
          const item = items[vi.index].raw as T;
          const onSelect = onSelectFactory ? onSelectFactory(item) : undefined;
          return (
            <div
              key={vi.key}
              data-index={vi.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vi.start}px)`,
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              {render(item, onSelect)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FilterableList<T extends FilterableItem>({
  tagGroups,
  items,
  isLoading = false,
  searchPlaceholder = "Search items...",
  emptyStateMessage = "No items found matching the criteria",
  loadingMessage = "Loading items...",
  onItemSelect,
  selectButtonText = "Select",
  showSelectButton = true,
  renderItem,
  className = "",
}: FilterableListProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxAgeFilter, setMaxAgeFilter] = useState<number | null>(null);

  const multiSelectOptions = useMemo(() => {
    if (!tagGroups) return [];
    const allTags = new Set(items.flatMap((item) => item.tags));
    const disabledTags = new Set(
      items
        .flatMap((item) => item.tags)
        .filter((tag) =>
          maxAgeFilter != null
            ? items
                .filter((item) => item.tags.includes(tag))
                .every(
                  (item) => item.minAge == null || item.minAge > maxAgeFilter,
                )
            : false,
        ),
    );

    return tagGroups
      .map((group) => {
        const options = group.tags
          .filter((tag) => allTags.has(tag.name))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((tag) => ({
            value: tag.name,
            label: tag.name,
            description: tag.description,
            style: {
              iconColor: disabledTags.has(tag.name)
                ? "var(--destructive)"
                : undefined,
            },
            icon: disabledTags.has(tag.name) ? GraduationCapIcon : undefined,
          }));
        return { heading: group.name, options };
      })
      .filter((group) => group.options.length > 0);
  }, [tagGroups, items, maxAgeFilter]);

  const normalizedItems = useMemo(
    () =>
      items.map((it) => ({
        raw: it,
        search: (it.name + " " + it.description).toLowerCase(),
      })),
    [items],
  );

  const tagDescriptionMap = useMemo(() => {
    const map = new Map<string, string>();
    tagGroups?.forEach((group) => {
      group.tags.forEach((tag) => {
        map.set(tag.name, tag.description);
      });
    });
    return map;
  }, [tagGroups]);

  const availableAges = useMemo(() => {
    const ages = new Set<number>();
    items.forEach((item) => {
      if (item.minAge != null) {
        ages.add(item.minAge);
      }
    });
    return Array.from(ages).sort((a, b) => a - b);
  }, [items]);

  const loweredSearch = searchQuery.toLowerCase();

  const filteredItems = useMemo(() => {
    if (!loweredSearch && selectedTags.length === 0 && maxAgeFilter == null)
      return normalizedItems;
    return normalizedItems.filter(({ raw, search }) => {
      if (loweredSearch && !search.includes(loweredSearch)) return false;
      if (
        selectedTags.length > 0 &&
        !selectedTags.every((tag) => raw.tags.includes(tag))
      )
        return false;
      return !(
        maxAgeFilter != null &&
        (raw.minAge == null || raw.minAge > maxAgeFilter)
      );
    });
  }, [normalizedItems, loweredSearch, selectedTags, maxAgeFilter]);

  const defaultRenderItem = (item: T, onSelect?: () => void) => (
    <div
      key={`${item.name}-${item.description}`}
      className="hover:bg-muted/50 rounded-lg border p-4 transition-colors sm:pb-1"
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-semibold">{item.name}</h3>
        {showSelectButton && onSelect && (
          <Button
            size="sm"
            onClick={onSelect}
            className="ml-2 hidden flex-shrink-0 sm:inline-flex"
          >
            <PlusIcon />
            {selectButtonText}
          </Button>
        )}
      </div>

      <p className="mb-1 text-sm text-gray-600 sm:mb-3">{item.description}</p>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-2 pb-2.5">
          {item.minAge != null && (
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="default" className="text-xs">
                  {item.minAge}+
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Minimalny wiek: {item.minAge} lat</TooltipContent>
            </Tooltip>
          )}
          {item.tags.map((tag) => (
            <Tooltip key={tag}>
              <TooltipTrigger>
                <Badge variant="outline" className="text-xs">
                  {tag}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                {tagDescriptionMap.get(tag) || tag}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
      {showSelectButton && onSelect && (
        <Button
          size="sm"
          onClick={onSelect}
          className="w-full flex-shrink-0 sm:hidden"
        >
          <PlusIcon />
          {selectButtonText}
        </Button>
      )}
    </div>
  );

  return (
    <div className={`flex min-h-0 flex-1 flex-col space-y-4 ${className}`}>
      {/* Search and Filters */}
      <div className="flex-shrink-0 space-y-3">
        <Input
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startIcon={SearchIcon}
        />

        {/* Tag filters */}
        <div className="flex flex-row items-center space-x-2">
          <MultiSelect
            options={multiSelectOptions}
            onValueChange={setSelectedTags}
            defaultValue={selectedTags}
            placeholder="Filteruj według tagów"
            className="flex-1"
            modalPopover={true}
            hideSelectAll={true}
            singleLine={true}
            popoverClassName="min-w-[var(--radix-popover-trigger-width)]"
          />
          <Select
            value={maxAgeFilter?.toString() || ""}
            onValueChange={(value) =>
              setMaxAgeFilter(value === "null" ? null : parseInt(value, 10))
            }
          >
            <SelectTrigger
              size="lg"
              className="min-w-16 data-[size=lg]:h-12 sm:data-[size=lg]:h-10"
            >
              <SelectValue placeholder="Wiek" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] min-w-auto">
              <SelectItem key="all" value="null">
                --
              </SelectItem>
              {availableAges.map((age) => (
                <SelectItem key={age} value={age.toString()}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Items List */}
      <div className="min-h-0 flex-1">
        <ScrollArea className="h-full w-full sm:pr-4">
          <div className="space-y-3">
            {isLoading ? (
              <div className="py-8 text-center text-gray-500">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p>{loadingMessage}</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <SearchIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>{emptyStateMessage}</p>
              </div>
            ) : (
              <VirtualizedList
                items={filteredItems}
                itemSize={300}
                overscan={6}
                onSelectFactory={
                  onItemSelect ? (i) => () => onItemSelect(i) : undefined
                }
                render={(item, onSelect) =>
                  renderItem
                    ? renderItem(item, onSelect)
                    : defaultRenderItem(item, onSelect)
                }
              />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

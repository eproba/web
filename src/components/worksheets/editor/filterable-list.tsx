import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import {
  FilterableItem,
  FilterableListProps,
} from "@/types/filterable-components";
import { PlusIcon, SearchIcon, TagIcon } from "lucide-react";
import React, { useMemo, useState } from "react";

export function FilterableList<T extends FilterableItem>({
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

  // Extract all unique tags from items
  const availableTags = useMemo(() => {
    return items.reduce<string[]>((acc, item) => {
      item.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, []);
  }, [items]);

  // Filter items based on search query and selected tags
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => item.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [items, searchQuery, selectedTags]);

  const handleTagToggle = (tag: string, pressed: boolean) => {
    if (pressed) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    }
  };

  const defaultRenderItem = (item: T, onSelect?: () => void) => (
    <div
      key={`${item.name}-${item.description}`}
      className="hover:bg-muted rounded-lg border p-4 transition-colors"
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        {showSelectButton && onSelect && (
          <Button size="sm" onClick={onSelect} className="ml-2 flex-shrink-0">
            <PlusIcon className="mr-1 size-4" />
            {selectButtonText}
          </Button>
        )}
      </div>

      <p className="mb-3 text-gray-600">{item.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        {item.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
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
        {availableTags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <TagIcon className="size-4" />
              Tag filters:
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Toggle
                  key={tag}
                  variant="outline"
                  size="sm"
                  pressed={selectedTags.includes(tag)}
                  onPressedChange={(pressed) => handleTagToggle(tag, pressed)}
                  className="data-[state=on]:bg-foreground data-[state=on]:text-primary-foreground h-5 text-xs"
                >
                  {tag}
                </Toggle>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="min-h-0 flex-1">
        <ScrollArea className="h-full w-full pr-4">
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
              filteredItems.map((item) => {
                const onSelect = onItemSelect
                  ? () => onItemSelect(item)
                  : undefined;
                return renderItem
                  ? renderItem(item, onSelect)
                  : defaultRenderItem(item, onSelect);
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

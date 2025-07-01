import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SearchIcon, TagIcon, PlusIcon } from "lucide-react";
import {
  FilterableItem,
  FilterableListProps,
} from "@/types/filterable-components";

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
      className="border rounded-lg p-4 hover:bg-muted transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        {showSelectButton && onSelect && (
          <Button size="sm" onClick={onSelect} className="ml-2 flex-shrink-0">
            <PlusIcon className="w-4 h-4 mr-1" />
            {selectButtonText}
          </Button>
        )}
      </div>

      <p className="text-gray-600 mb-3">{item.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        {item.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col flex-1 min-h-0 space-y-4 ${className}`}>
      {/* Search and Filters */}
      <div className="space-y-3 flex-shrink-0">
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
              <TagIcon className="w-4 h-4" />
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
                  className="text-xs h-5 data-[state=on]:bg-foreground data-[state=on]:text-primary-foreground"
                >
                  {tag}
                </Toggle>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Items List */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full w-full pr-4">
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                <div className="w-12 h-12 mx-auto mb-4 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p>{loadingMessage}</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
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

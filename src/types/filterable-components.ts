// Common interface for items that can be used with FilterableList
export interface FilterableItem {
  name: string;
  description: string;
  tags: string[];
  minAge?: number;
}

// Props for the FilterableList component
export interface FilterableListProps<T extends FilterableItem> {
  tagGroups?: { name: string; tags: { name: string; description: string }[] }[];
  items: T[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  emptyStateMessage?: string;
  loadingMessage?: string;
  onItemSelect?: (item: T) => void;
  selectButtonText?: string;
  showSelectButton?: boolean;
  renderItem?: (item: T, onSelect?: () => void) => React.ReactNode;
  className?: string;
}

export interface Storage<TItem = string | null> {
  getItem: (key: string) => TItem;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  onError: (error: unknown) => void;
}

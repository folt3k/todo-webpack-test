export interface TodoItem {
  id?: number;
  content: string;
  done: boolean;
}

export enum FilterType {
  ALL = "ALL",
  OPEN = "OPEN",
  COMPLETE = "COMPLETE",
}

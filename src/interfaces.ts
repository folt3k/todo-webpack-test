export interface TodoItem {
  id?: number;
  content: string;
  complete: boolean;
}

export interface Counters {
  total: number;
  complete: number;
  open: number;
}

export enum FilterType {
  ALL = 'ALL',
  OPEN = 'OPEN',
  COMPLETE = 'COMPLETE',
}

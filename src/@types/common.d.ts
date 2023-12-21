export interface DataResponseInfinite<T extends any[]> {
  data: T;
  pageKey?: number;
}

export type ActionType = "accept" | "reject"; 

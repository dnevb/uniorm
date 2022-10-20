export interface Operators<T = any, k = any> extends Methods<T> {
  eq: K;
  ne: K;
  in: K;
  ni: K;
  gt: K;
  ge: K;
  lt: K;
  le: K;
  contains: K;
  nocontains: K;
  startsWith: K;
  endsWith: K;
  between: {
    min: K;
    max: K;
  };
}

export type Methods<T> = {
  and: Filter<T>;
  or: Filter<T>;
};

export type Filter<T = any, K = keyof T> = Partial<
  Record<K, Partial<Operators<T>> | T[K]> & Methods<T>
>;

export type Sort =
  | {
      column: string;
      order?: string;
    }
  | string;

export type Pagination = {
  type?: "cursor" | "page";
  limit?: number | string;
  offset?: number | string;
};

export type Modifiers<T = any> = {
  include?: string[];
  filter?: Filter<T>;
  sort?: Sort;
  pagination?: Pagination;
};

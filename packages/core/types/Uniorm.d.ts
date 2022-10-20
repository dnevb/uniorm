import type { Adapter } from "./Adapter";
import type { Model } from "./Model";
import type { Resource } from "./Resource";

export interface UniormOptions {
  defaultAdapter: string;
  resources: Array<Resource>;
  adapters: Record<string, Adapter>;
}

export type UniormFn = (opts: UniormOptions) => Uniorm;

export interface Uniorm {
  rs: <T>(name: string) => Model<T>;
}

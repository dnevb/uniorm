import type { Modifiers } from "./Modifiers";
import type { Resource } from "./Resource";

export type FindOneArgs = { key: ID; include?: string[] };
export type FindManyArgs<T = any> = Modifiers<T>;
export type CreateArgs = { input: any; include?: string[] };
export type UpdateArgs = { key: ID; input: any; include?: string[] };
export type DeleteArgs = { key: ID; include?: string[] };

export type AdapterHandler<A, R> = (
  rs: Resource,
  args: A,
  context: any
) => Promise<R>;

export interface Adapter<Client = any, T = any> {
  client: Client;
  findMany: AdapterHandler<FindManyArgs, T>;
  findOne: AdapterHandler<FindOneArgs, T>;
  create: AdapterHandler<CreateArgs, T>;
  update: AdapterHandler<UpdateArgs, T>;
  delete: AdapterHandler<DeleteArgs, T>;
}

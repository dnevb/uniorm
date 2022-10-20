import type { Modifiers } from "./Modifiers";
import type { Resource } from "./Resource";

export type FindOneArgs = {
  include?: string[];
  key: ID;
};
export type FindManyArgs<T = any> = Modifiers<T>;
export type CreateArgs = { input: any };
export type UpdateArgs = { key: ID; input: any };
export type DeleteArgs = { key: ID };

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

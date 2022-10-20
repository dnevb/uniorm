import type { Resource } from "./Resource";

export type ModelHandler<A, R> = (args: A, context: any) => Promise<R>;

export interface Model<T = any> {
  resource: Resource;
  findMany: ModelHandler<FindManyArgs, T>;
  findOne: ModelHandler<FindOneArgs, T>;
  create: ModelHandler<CreateArgs, T>;
  update: ModelHandler<UpdateArgs, T>;
  delete: ModelHandler<DeleteArgs, T>;
}

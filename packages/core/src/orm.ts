import type { UniormFn } from "../types/Uniorm";
import { createModels } from "./model.js";

const uniorm: UniormFn = (opts) => {
  const models = createModels(opts);

  const rs = (name: string) => {
    const model = models.get(name);
    if (!model) throw new Error(`Resource: ${name} not found`);

    return model;
  };

  return { rs };
};

export default uniorm;

export type FieldType =
  | "str"
  | "num"
  | "int"
  | "bool"
  | "date"
  | "time"
  | "date-time";

export interface Field {
  type: FieldType;
  ref: string;
  name?: string;
  title?: string;
  default?: any;
  // Rules
  required?: boolean;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface Resource {
  key: string;
  ref: string;
  name?: string;
  title?: string;
  fields: Array<Field>;
  adapter?: string;
}

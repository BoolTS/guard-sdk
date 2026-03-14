export type ExtractTuple<T> = T extends readonly [...infer U] ? U : never;

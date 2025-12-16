import type { TPartialTuple } from "./partialTuple";
export type TPartialTupleNonEmpty<T extends readonly any[]> = T extends readonly [
    infer Head,
    ...infer Tail
] ? [Head, ...TPartialTuple<Tail>] | TPartialTupleNonEmpty<Tail> : never;

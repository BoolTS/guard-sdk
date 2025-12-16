import type { TPartialTuple } from "./partialTuple";
import type { TPermutationTuple } from "./permutationTuple";

export type TPartialTupleUnordered<T extends readonly any[]> = TPartialTuple<T> extends infer S
    ? S extends readonly any[]
        ? TPermutationTuple<S[number]>
        : never
    : never;

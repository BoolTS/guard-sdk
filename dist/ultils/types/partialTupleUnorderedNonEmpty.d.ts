import type { TPartialTupleNonEmpty } from "./partialTurpleNonEmpty";
import type { TPermutationTuple } from "./permutationTuple";
export type TOptionalTupleUnorderedNonEmpty<T extends readonly any[]> = TPartialTupleNonEmpty<T> extends infer S ? S extends readonly any[] ? TPermutationTuple<S[number]> : never : never;

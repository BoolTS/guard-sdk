export type TPermutationTuple<T, K = T> = [T] extends [never]
    ? []
    : T extends any
      ? [T, ...TPermutationTuple<Exclude<K, T>>]
      : never;

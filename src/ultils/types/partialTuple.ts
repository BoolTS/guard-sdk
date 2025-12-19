export type TPartialTuple<T extends readonly any[]> = T extends readonly [
    infer Head,
    ...infer Tail
]
    ? TPartialTuple<Tail> | [Head, ...TPartialTuple<Tail>]
    : [];

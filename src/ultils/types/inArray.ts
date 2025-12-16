export type TInArray<T, X> = T extends readonly [X, ...infer _Rest]
    ? true
    : T extends readonly [X]
    ? true
    : T extends readonly [infer _, ...infer Rest]
    ? TInArray<Rest, X>
    : false;

export type MergeTuple<T extends readonly any[], U> = {
    [K in keyof T]: T[K] & U;
};

type ValuesOfKey<Arr extends any[], K extends keyof any> = Arr extends [
    infer Head,
    ...infer Tail
] ? Head extends Record<K, any> ? [Head[K], ...ValuesOfKey<Tail, K>] : ValuesOfKey<Tail, K> : [];
type Includes<Arr extends any[], V> = Arr extends [infer H, ...infer R] ? [V] extends [H] ? true : Includes<R, V> : false;
type HasDuplicate<Arr extends readonly any[], K extends keyof any> = Arr extends [infer Head, ...infer Tail] ? Head extends Record<K, any> ? Includes<ValuesOfKey<Tail, K>, Head[K]> extends true ? true : HasDuplicate<Tail, K> : HasDuplicate<Tail, K> : false;
export type TEnforceUnique<Arr extends readonly any[], K extends keyof Arr[number]> = HasDuplicate<Arr, K> extends true ? ["Duplicate key found"] : Arr;
export {};

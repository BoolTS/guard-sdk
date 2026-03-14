type DeepReadonly<T> = T extends (...args: any[]) => any ? T : T extends readonly any[] ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;
export declare function deepFreeze<const T>(obj: T): DeepReadonly<T>;
export {};

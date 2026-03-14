export type TDeepReadonly<T> = T extends (...args: any[]) => any ? T : T extends readonly any[] ? {
    readonly [K in keyof T]: TDeepReadonly<T[K]>;
} : T extends object ? {
    readonly [K in keyof T]: TDeepReadonly<T[K]>;
} : T;

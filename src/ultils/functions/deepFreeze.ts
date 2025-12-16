type DeepReadonly<T> = T extends (...args: any[]) => any
    ? T
    : T extends readonly any[]
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

export function deepFreeze<const T>(obj: T): DeepReadonly<T> {
    if (typeof obj !== "object" || obj === null) return obj as any;
    Object.freeze(obj);
    for (const key of Object.keys(obj)) {
        const val = (obj as any)[key];
        if (typeof val === "object" && val !== null && !Object.isFrozen(val)) {
            deepFreeze(val);
        }
    }
    return obj as any;
}

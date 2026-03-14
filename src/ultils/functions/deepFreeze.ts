import type { TDeepReadonly } from "../types";

export function deepFreeze<const T>(obj: T): TDeepReadonly<T> {
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

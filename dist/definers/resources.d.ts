import type { TPolicyDefinition, TResourceDefinition } from "../types";
import type { TDeepReadonly, TEnforceUnique } from "../ultils/types";
export declare const defineResources: <const T extends readonly TResourceDefinition[], D extends TDeepReadonly<T>>(resources: T & TEnforceUnique<T, "alias">) => Readonly<{
    getResource: <K extends D extends never ? never : D[number]["alias"], R extends Extract<D[number], {
        alias: K;
    }>>(alias: K) => R;
    resources: TDeepReadonly<T & TEnforceUnique<T, "alias">>;
    definePolicies: <const K extends readonly TPolicyDefinition<T>[]>(policies: K & TEnforceUnique<K, "alias">) => Readonly<{
        policies: TDeepReadonly<K & TEnforceUnique<K, "alias">>;
    }>;
}>;

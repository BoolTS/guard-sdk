import type { TPolicyDefinition, TResourceDefinition } from "../types";
import type { TDeepReadonly, TEnforceUnique } from "../ultils/types";
export declare const defineResources: <const T extends readonly TResourceDefinition[], D extends TDeepReadonly<T>>(resources: TEnforceUnique<T, "alias">) => Readonly<{
    getResource: <K extends D extends never ? never : D[number]["alias"], R extends D extends never ? never : Extract<D[number], {
        alias: K;
    }>>(alias: K) => R;
    resources: TDeepReadonly<TEnforceUnique<T, "alias">>;
    definePolicies: <const K extends readonly TPolicyDefinition<T>[]>(policies: TEnforceUnique<K, "alias">) => Readonly<{
        policies: TDeepReadonly<TEnforceUnique<K, "alias">>;
    }>;
}>;

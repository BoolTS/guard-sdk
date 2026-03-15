import type { TPolicyDefinition, TResourceDefinition, TRoleDefinition } from "../types";
import type { TDeepReadonly, TEnforceUnique } from "../ultils/types";
export declare const defineResources: <const T extends readonly TResourceDefinition[], D extends TDeepReadonly<T>>(resources: T & TEnforceUnique<T, "alias">) => Readonly<{
    resources: TDeepReadonly<T & TEnforceUnique<T, "alias">>;
    getResource: <K extends D extends never ? never : D[number]["alias"], R extends Extract<D[number], {
        alias: K;
    }>>(alias: K) => R;
    definePolicies: <const K extends readonly TPolicyDefinition<T>[]>(policies: TEnforceUnique<K, "alias">) => Readonly<{
        policies: TDeepReadonly<TEnforceUnique<K, "alias">>;
    }>;
    defineRoles: <const R_1 extends readonly TRoleDefinition<T>[] = readonly TRoleDefinition<T>[], L extends TDeepReadonly<R_1> = TDeepReadonly<R_1>>(roles: TEnforceUnique<{ [K in keyof R_1]: R_1[K] & {
        readonly permissions: R_1[K]["permissions"] & TEnforceUnique<R_1[K]["permissions"], "resource">;
    }; }, "alias">) => Readonly<{
        roles: TDeepReadonly<TEnforceUnique<{ [K in keyof R_1]: R_1[K] & {
            readonly permissions: R_1[K]["permissions"] & TEnforceUnique<R_1[K]["permissions"], "resource">;
        }; }, "alias">>;
        getRole: <K_1 extends L extends never ? never : L[number]["alias"], R_2 extends Extract<L[number], {
            alias: K_1;
        }>>(alias: K_1) => R_2;
    }>;
}>;

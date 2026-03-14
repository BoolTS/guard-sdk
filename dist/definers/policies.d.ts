import type { TPolicyDefinition } from "../types";
import type { TEnforceUnique } from "../ultils/types";
export declare const definePolicies: <const K extends readonly TPolicyDefinition[]>(policies: TEnforceUnique<K, "alias">) => Readonly<{
    policies: import("../ultils/types").TDeepReadonly<TEnforceUnique<K, "alias">>;
}>;

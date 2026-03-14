import type { TPolicyDefinition } from "../types";
import type { TEnforceUnique } from "../ultils/types";
export declare const definePolicies: <const T extends readonly TPolicyDefinition[]>(policies: T & TEnforceUnique<T, "alias">) => Readonly<{
    policies: import("../ultils/types").TDeepReadonly<T & TEnforceUnique<T, "alias">>;
}>;

import type { TPolicyDefinition } from "../types";
import type { TEnforceUnique } from "../ultils/types";

import { deepFreeze } from "../ultils/functions";

export const definePolicies = <const K extends readonly TPolicyDefinition[]>(
    policies: TEnforceUnique<K, "alias">
) => {
    if (
        new Set([
            ...policies
                .map((policy) =>
                    typeof policy === "string" ? undefined : policy.alias
                )
                .filter((policyAlias) => typeof policyAlias !== "undefined")
        ]).size !== policies.length
    ) {
        throw new Error("Duplicated policy alias.");
    }

    return Object.freeze({
        policies: deepFreeze(policies)
    });
};

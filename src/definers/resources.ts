import type { TPolicyDefinition, TResourceDefinition } from "../types";
import type { TEnforceUnique } from "../ultils/types";

import { deepFreeze } from "../ultils/functions";

export const defineResources = <const T extends readonly TResourceDefinition[]>(
    resources: TEnforceUnique<T, "type">
) => {
    if (
        new Set([
            ...resources
                .map((resource) =>
                    typeof resource === "string" ? undefined : resource.type
                )
                .filter((resourceType) => typeof resourceType !== "undefined")
        ]).size !== resources.length
    ) {
        throw new Error("Duplicated resource type.");
    }

    return Object.freeze({
        resources: deepFreeze(resources),
        definePolicies: <const K extends readonly TPolicyDefinition<T>[]>(
            policies: TEnforceUnique<K, "alias">
        ) => {
            if (
                new Set([
                    ...policies
                        .map((policy) =>
                            typeof policy === "string"
                                ? undefined
                                : policy.alias
                        )
                        .filter(
                            (policyAlias) => typeof policyAlias !== "undefined"
                        )
                ]).size !== policies.length
            ) {
                throw new Error("Duplicated policy alias.");
            }

            return Object.freeze({
                policies: deepFreeze(policies)
            });
        }
    });
};

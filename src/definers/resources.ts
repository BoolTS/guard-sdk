import type { TPolicyDefinition, TResourceDefinition } from "../types";
import type { TDeepReadonly, TEnforceUnique } from "../ultils/types";

import { deepFreeze } from "../ultils/functions";

export const defineResources = <
    const T extends readonly TResourceDefinition[],
    D extends TDeepReadonly<T>
>(
    resources: T & TEnforceUnique<T, "alias">
) => {
    if (
        new Set([
            ...resources
                .map((resource) =>
                    typeof resource === "string" ? undefined : resource.alias
                )
                .filter((resourceType) => typeof resourceType !== "undefined")
        ]).size !== resources.length
    ) {
        throw new Error("Duplicated resource alias.");
    }

    const resourceFreezed = deepFreeze(resources);

    return Object.freeze({
        getResource: <
            K extends D extends never ? never : D[number]["alias"],
            R extends Extract<D[number], { alias: K }>
        >(
            alias: K
        ): R => {
            const index = resourceFreezed.findIndex(
                ({ alias: resourceAlias }) => alias === resourceAlias
            );

            if (index === -1) {
                throw new Error(
                    "Resource not found, intialize resources error."
                );
            }

            return resourceFreezed[index] as R;
        },
        resources: resourceFreezed,
        definePolicies: <const K extends readonly TPolicyDefinition<T>[]>(
            policies: K & TEnforceUnique<K, "alias">
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

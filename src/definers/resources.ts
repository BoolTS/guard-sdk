import type { TPolicyDefinition, TResourceDefinition } from "../types";
import type { TDeepReadonly, TEnforceUnique } from "../ultils/types";

import { deepFreeze } from "../ultils/functions";

export const defineResources = <
    const T extends readonly TResourceDefinition[],
    D extends TDeepReadonly<T>
>(
    resources: TEnforceUnique<T, "alias">
) => {
    if (
        resources === `Duplicate key "alias" found` ||
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

    if (resourceFreezed === `Duplicate key "alias" found`) {
        throw new Error("Duplicated resource alias.");
    }

    return Object.freeze({
        getResource: <
            K extends D extends never ? never : D[number]["alias"],
            R extends D extends never ? never : Extract<D[number], { alias: K }>
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
            policies: TEnforceUnique<K, "alias">
        ) => {
            if (
                policies === `Duplicate key "alias" found` ||
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

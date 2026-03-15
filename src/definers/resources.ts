import type {
    TPolicyDefinition,
    TResourceDefinition,
    TRoleDefinition
} from "../types";
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
        resources: resourceFreezed,
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
        },
        defineRoles: <
            const R extends readonly TRoleDefinition<T>[] =
                readonly TRoleDefinition<T>[],
            L extends TDeepReadonly<R> = TDeepReadonly<R>
        >(
            roles: TEnforceUnique<
                {
                    [K in keyof R]: R[K] & {
                        readonly permissions: R[K]["permissions"] &
                            TEnforceUnique<R[K]["permissions"], "resource">;
                    };
                },
                "alias"
            >
        ) => {
            if (
                new Set([
                    ...roles
                        .map((role) =>
                            typeof role === "string" ? undefined : role.alias
                        )
                        .filter(
                            (policyAlias) => typeof policyAlias !== "undefined"
                        )
                ]).size !== roles.length
            ) {
                throw new Error("Duplicated role alias.");
            }

            const rolesFreezed = deepFreeze(roles);

            return Object.freeze({
                roles: rolesFreezed,
                getRole: <
                    K extends L extends never ? never : L[number]["alias"],
                    R extends Extract<L[number], { alias: K }>
                >(
                    alias: K
                ): R => {
                    const index = rolesFreezed.findIndex(
                        ({ alias: roleAlias }) => alias === roleAlias
                    );

                    if (index === -1) {
                        throw new Error(
                            "Role not found, intialize roles error."
                        );
                    }

                    return rolesFreezed[index] as R;
                }
            });
        }
    });
};

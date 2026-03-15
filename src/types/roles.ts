import type {
    TEnforceUnique,
    TOptionalTupleUnorderedNonEmpty
} from "../ultils/types";
import type { TResourceDefinition } from "./resources";

export type TRolePermissionDefinition<
    T extends readonly TResourceDefinition[] = readonly TResourceDefinition[]
> = {
    [R in T[number] as R["alias"]]: {
        readonly resource: R["alias"];
        readonly actions: TOptionalTupleUnorderedNonEmpty<R["actions"]>;
    };
}[T[number]["alias"]];

export type TRoleDefinition<
    T extends readonly TResourceDefinition[] = readonly TResourceDefinition[]
> = {
    readonly alias: string;
    readonly [key: string]: unknown;
} & {
    readonly permissions: TEnforceUnique<
        Array<TRolePermissionDefinition<T>>,
        "resource"
    >;
};

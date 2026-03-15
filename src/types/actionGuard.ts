import type { TOptionalTupleUnorderedNonEmpty } from "../ultils/types";
import type { TResourceDefinition } from "./resources";

export type TActionGuardOptions<
    T extends readonly TResourceDefinition[] = readonly TResourceDefinition[]
> = {
    [R in T[number] as R["alias"]]: {
        resource: R["alias"];
        action:
            | R["actions"][number]
            | TOptionalTupleUnorderedNonEmpty<R["actions"]>;
    };
}[T[number]["alias"]];

import type { TOptionalTupleUnorderedNonEmpty } from "../ultils/types";
import type { TResourceDefinition } from "./resources";

export type TActionGuardOptions<T extends readonly TResourceDefinition[]> = {
    [R in T[number] as R["type"]]: {
        resource: R["type"];
        action:
            | R["actions"][number]
            | TOptionalTupleUnorderedNonEmpty<R["actions"]>;
    };
}[T[number]["type"]];

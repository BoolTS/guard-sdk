import type { TResourceDefinition } from "./resources";

export type TControllerGuardOptions<T extends readonly TResourceDefinition[]> =
    {
        [R in T[number] as R["type"]]: {
            resource: R["type"];
        };
    }[T[number]["type"]];

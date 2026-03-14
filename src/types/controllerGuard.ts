import type { TResourceDefinition } from "./resources";

export type TControllerGuardOptions<T extends readonly TResourceDefinition[]> =
    {
        [R in T[number] as R["alias"]]: {
            resource: R["alias"];
        };
    }[T[number]["alias"]];

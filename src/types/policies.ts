import type { TResourceDefinition } from "./resources";

export type TPolicyDefinition<
    T extends readonly TResourceDefinition[] = readonly TResourceDefinition[]
> = {
    readonly alias: string;
    readonly effect: "permit" | "deny";
    readonly [key: string]: unknown;
} & {
    [R in T[number] as R["alias"]]: {
        readonly resource: R["alias"];
        readonly action: R["actions"][number];
    };
}[T[number]["alias"]];

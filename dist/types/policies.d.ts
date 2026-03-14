import type { TResourceDefinition } from "./resources";
export type TPolicyDefinition<T extends readonly TResourceDefinition[] = readonly TResourceDefinition[]> = {
    readonly alias: string;
    readonly effect: "permit" | "deny";
    readonly [key: string]: unknown;
} & {
    [R in T[number] as R["type"]]: {
        readonly resource: R["type"];
        readonly action: R["actions"][number];
    };
}[T[number]["type"]];

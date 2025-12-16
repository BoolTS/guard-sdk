import type { TResourceDefinition } from "./resources";

export type TPolicyDefinition<
    T extends readonly TResourceDefinition[] = readonly TResourceDefinition[]
> = {
    readonly alias: string;
    readonly effect: "permit" | "deny";
    readonly [key: string]: unknown;
} & {
    [R in T[number] as R["type"]]: {
        readonly resource: R["type"];
        readonly action: R["actions"][number];
    };
}[T[number]["type"]];

// export type TPolicyAttributes<
//     T extends readonly TResourceDefinition[],
//     K extends readonly TPolicyDefinition[] = readonly TPolicyDefinition[]
// > = {
//     [R in K[number] as R["alias"]]: {
//         readonly alias: string;
//         readonly effect: "permit" | "deny";
//     } & {
//         [R in T[number] as R["type"]]: {
//             readonly resource: R["type"];
//             readonly action: R["actions"][number];
//         };
//     }[T[number]["type"]];
// }[K[number]["alias"]];

// {
//     [R in K[number] as R["type"]]: {
//         readonly resource: R["type"];
//         readonly action: R["actions"][number];
//     };
// }[K[number]["type"]];

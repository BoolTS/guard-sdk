import type { TNonEmptyArray } from "../ultils/types";
export type TResourceDefinition<T extends string = string, A extends TNonEmptyArray<string> = TNonEmptyArray<string>> = {
    readonly type: T;
    readonly actions: A;
    readonly [key: string]: unknown;
};

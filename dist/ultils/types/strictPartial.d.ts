export type TStrictPartial<T> = {
    [K in keyof T]?: T[K];
} & {
    [K in keyof T as K extends string ? never : never]: never;
};

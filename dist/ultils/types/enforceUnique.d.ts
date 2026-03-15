type IsDuplicated<P extends readonly any[], K extends string, Index extends string> = {
    [I in keyof P]: I extends Index ? never : P[I] extends Record<K, any> ? Index extends keyof P ? P[Index] extends Record<K, any> ? P[I][K] extends P[Index][K] ? true : never : never : never : never;
}[number] extends never ? false : true;
export type TEnforceUnique<A extends readonly any[], K extends string> = {
    [I in keyof A]: IsDuplicated<A, K, I & string> extends true ? A[I] & {
        readonly __error: `Error: Duplicate value "${A[I] extends Record<K, any> ? A[I][K] : ""}" at key "${K}"`;
    } : A[I];
};
export {};

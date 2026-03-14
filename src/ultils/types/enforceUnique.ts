type IsDuplicated<
    Arr extends readonly any[],
    K extends string,
    CurrentValue,
    Index extends string
> = {
    [I in keyof Arr]: I extends Index
        ? never
        : Arr[I] extends Record<K, any>
          ? Arr[I][K] extends CurrentValue
              ? true
              : never
          : never;
}[number] extends never
    ? false
    : true;

export type TEnforceUnique<
    Arr extends readonly any[],
    K extends keyof Arr[number]
> = {
    [I in keyof Arr]: IsDuplicated<
        Arr,
        K & string,
        Arr[I] extends Record<K, any> ? Arr[I][K] : never,
        I & string
    > extends true
        ? `❌ ERROR: Duplicate value "${Arr[I][K] & string}" found at key "${K & string}"`
        : Arr[I];
};

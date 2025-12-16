type Values<T> = T[keyof T];

export type TShuffleTuple<U extends string | number> = [U] extends [never]
    ? []
    : Values<{
          [K in U]: [K, ...TShuffleTuple<Exclude<U, K>>];
      }>;

export type TDefaultAccountMetadata = Record<string, string | number | Date | null | undefined>;

export interface IAccount<T = TDefaultAccountMetadata> {
    uuid: string;
    status: string;
    metadata?: T | null;
}

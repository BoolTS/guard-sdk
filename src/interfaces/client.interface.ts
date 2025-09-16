import type { IAccount, TDefaultAccountMetadata } from "./account.interface";
import type { IAccountCredential } from "./accountCredential.interface";

export type TClientConfigs = {
    tenantId: string;
    appId: string;
    modeId: string;
    secretKey: string;
};

export type TClientOptions = {
    version?: 1;
    logs?: boolean;
};

export interface IClient<
    TAccountMetadata extends TDefaultAccountMetadata = TDefaultAccountMetadata
> {
    createPlainAccount(args: {
        identity: string;
        password: string;
        metadata?: TAccountMetadata | null;
    }): Promise<
        Readonly<{
            account: IAccount<TAccountMetadata>;
            credential: IAccountCredential;
        }>
    >;
    createEmailAccount(args: {
        identity: string;
        password: string | null;
        metadata?: TAccountMetadata | null;
    }): Promise<
        Readonly<{
            account: IAccount<TAccountMetadata>;
            credential: IAccountCredential;
        }>
    >;
    authenticate(args: { identity: string; password?: string | null }): Promise<{
        token: string;
        account: IAccount<TAccountMetadata>;
        credential: IAccountCredential;
    }>;
    verifyToken(args: {
        token: string;
    }): Promise<{ account: IAccount<TAccountMetadata>; credential: IAccountCredential }>;
}

export type TAuthState = {
    account: IAccount;
    credential: IAccountCredential;
};

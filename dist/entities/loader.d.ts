import type { TClientCredential, TClientDefinition, TClientOptions } from "../interfaces/client.interface";
import { Client } from "../instances/client";
export type TLoaderParameters = {
    credential: TClientCredential;
    definition?: TClientDefinition;
    options?: TClientOptions;
};
export declare const loader: ({ credential, definition, options }: TLoaderParameters) => Promise<[Symbol, Client]>;

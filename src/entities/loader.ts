import type {
    TClientCredential,
    TClientDefinition,
    TClientOptions
} from "../interfaces/client.interface";

import { Keys } from "../constants";
import { Client } from "../instances/client";

export type TLoaderParameters = {
    credential: TClientCredential;
    definition?: TClientDefinition;
    options?: TClientOptions;
};

export const loader = async ({
    credential,
    definition,
    options
}: TLoaderParameters): Promise<[symbol, Client]> => {
    const boolGuardClient = new Client({ credential, definition, options });

    await boolGuardClient.signToken();

    const pingResult = await boolGuardClient.ping();

    if (!pingResult) {
        throw new Error("Ping to Bool Guard service failed!");
    }

    return [Keys.guardClient, boolGuardClient];
};

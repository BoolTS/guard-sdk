import type { TClientConfigs, TClientOptions } from "../interfaces/client.interface";

import { Keys } from "../constants";
import { Client } from "../instances/client";

export const loader = async (clientConfigs: TClientConfigs, clientOptions?: TClientOptions) => {
    const boolGuardClient = new Client(clientConfigs, clientOptions);

    await boolGuardClient.signToken();

    const pingResult = await boolGuardClient.ping();

    if (!pingResult) {
        throw new Error("Ping to Bool Guard service failed!");
    }

    return [Keys.guardClient, boolGuardClient];
};

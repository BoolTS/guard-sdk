import type { TClientConfigs, TClientOptions } from "../interfaces/client.interface";
import { Client } from "../instances/client";
export declare const loader: (clientConfigs: TClientConfigs, clientOptions?: TClientOptions) => Promise<(symbol | Client)[]>;

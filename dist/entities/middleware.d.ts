import type { IContext, IMiddleware } from "@bool-ts/core";
import type { IClient } from "../interfaces/client.interface";
/**
 * Bool guard middleware for Bool Typescript framework
 */
export declare class Middleware implements IMiddleware {
    private readonly clientInstance;
    /**
     *
     * @param tenantAppModesService
     */
    constructor(clientInstance: IClient);
    /**
     *
     * @param context
     * @param requestHeaders
     */
    start(context: IContext, requestHeaders: Headers): Promise<ThisType<IContext>>;
}

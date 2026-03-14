import type { IContext, IGuard, THttpRouteModel } from "@bool-ts/core";
import type { IClient } from "../interfaces/client.interface";
export declare class Guard implements IGuard {
    private readonly clientInstance;
    constructor(clientInstance: IClient | undefined);
    enforce(routeModel: THttpRouteModel, requestHeaders: Headers, context: IContext): Promise<boolean>;
}

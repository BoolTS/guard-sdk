import type { IGuard, THttpRouteModel } from "@bool-ts/core";
import type { TAuthState } from "../interfaces/client.interface";
export declare class Guard implements IGuard {
    enforce(routeModel: THttpRouteModel, authState: TAuthState): boolean;
}

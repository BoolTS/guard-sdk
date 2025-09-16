import type { IInterceptor, THttpRouteModel } from "@bool-ts/core";
import type { TAuthState } from "../interfaces/client.interface";
export declare class Interceptor implements IInterceptor {
    open(routeModel: THttpRouteModel, authState: TAuthState): void;
}

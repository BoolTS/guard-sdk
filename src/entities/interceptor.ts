import type { IInterceptor, THttpRouteModel } from "@bool-ts/core";
import type { TAuthState } from "../interfaces/client.interface";

import { Interceptor as BoolInterceptor, HttpClientError, RouteModel } from "@bool-ts/core";
import { Keys } from "../constants";
import { AuthState } from "../decorators/authState.decorator";

@BoolInterceptor()
export class Interceptor implements IInterceptor {
    open(
        @RouteModel()
        routeModel: THttpRouteModel,
        @AuthState()
        authState: TAuthState
    ) {
        const actionMetadataKeys = Reflect.getOwnMetadataKeys(
            routeModel.class.prototype,
            routeModel.funcName
        );

        if (actionMetadataKeys.includes(Keys.authState)) {
            if (!authState) {
                throw new HttpClientError({
                    httpCode: 401,
                    message: "Unauthorized",
                    data: undefined
                });
            }

            return;
        }

        const controllerMetadataKeys = Reflect.getOwnMetadataKeys(routeModel.class);

        if (controllerMetadataKeys.includes(Keys.authState)) {
            if (!authState) {
                throw new HttpClientError({
                    httpCode: 401,
                    message: "Unauthorized",
                    data: undefined
                });
            }

            return;
        }
    }
}

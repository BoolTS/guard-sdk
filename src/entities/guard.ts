import type { IGuard, THttpRouteModel } from "@bool-ts/core";
import type { TAuthState } from "../interfaces/client.interface";

import { Guard as BoolTsGuard, RouteModel } from "@bool-ts/core";
import { Keys } from "../constants";
import { AuthState } from "../decorators/authState.decorator";

@BoolTsGuard()
export class Guard implements IGuard {
    enforce(
        @RouteModel()
        routeModel: THttpRouteModel,
        @AuthState()
        authState: TAuthState
    ) {
        const actionMetadataKeys = Reflect.getOwnMetadataKeys(
            routeModel.class.prototype,
            routeModel.funcName
        );

        if (actionMetadataKeys.includes(Keys.guardMetadata)) {
            return !authState ? false : true;
        }

        const controllerMetadataKeys = Reflect.getOwnMetadataKeys(
            routeModel.class
        );

        if (controllerMetadataKeys.includes(Keys.guardMetadata)) {
            return !authState ? false : true;
        }

        return true;
    }
}

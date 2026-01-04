import type { IContext, IGuard, THttpRouteModel } from "@bool-ts/core";
import type { IClient, TAuthState } from "../interfaces/client.interface";

import {
    Guard as BoolTsGuard,
    Context,
    Inject,
    RequestHeaders,
    RouteModel
} from "@bool-ts/core";
import { Keys } from "../constants";
import { headersSchema } from "./@validators";

@BoolTsGuard()
export class Guard implements IGuard {
    constructor(
        @Inject(Keys.guardClient)
        private readonly clientInstance: IClient | undefined
    ) {}

    async enforce(
        @RouteModel()
        routeModel: THttpRouteModel,
        @RequestHeaders()
        requestHeaders: Headers,
        @Context()
        context: IContext
    ) {
        if (!this.clientInstance) {
            throw new Error("Bool guard instance not found.");
        }

        const actionMetadataKeys = Reflect.getOwnMetadataKeys(
            routeModel.class,
            routeModel.funcName
        );

        const controllerMetadataKeys = Reflect.getOwnMetadataKeys(
            routeModel.class
        );

        const isAuthAction = actionMetadataKeys.includes(Keys.guardMetadata);
        const isAuthController = controllerMetadataKeys.includes(
            Keys.guardMetadata
        );

        if (!isAuthAction && !isAuthController) {
            return true;
        }

        const headersValidation = await headersSchema.safeParseAsync(
            requestHeaders.toJSON()
        );

        if (!headersValidation.success) {
            return false;
        }

        try {
            const {
                authorization: { token }
            } = headersValidation.data;

            const { account, credential } =
                await this.clientInstance.verifyToken({
                    token: token
                });

            const authState: TAuthState = Object.freeze({
                account: account,
                credential: credential
            });

            context.set(Keys.authState, authState);

            return true;
        } catch {
            return false;
        }
    }
}

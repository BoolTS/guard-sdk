import type { IContext, IMiddleware } from "@bool-ts/core";
import type { IClient, TAuthState } from "../interfaces/client.interface";

import { Context, Inject, RequestHeaders } from "@bool-ts/core";
import { object, string } from "zod/v4";
import { Keys } from "../constants";
import { Client } from "../instances";

const headersSchema = object({
    authorization: string()
        .startsWith("Bearer ")
        .min(24)
        .transform((value) => {
            const [schema, token] = value.split(" ");

            return Object.freeze({
                schema,
                token
            });
        })
});

/**
 * Bool guard middleware for Bool Typescript framework
 */
export class Middleware implements IMiddleware {
    /**
     *
     * @param tenantAppModesService
     */
    constructor(
        @Inject(Client)
        private readonly clientInstance: IClient
    ) {}

    /**
     *
     * @param context
     * @param requestHeaders
     */
    async start(
        @Context()
        context: IContext,
        @RequestHeaders()
        requestHeaders: Headers
    ) {
        const headersValidation = await headersSchema.safeParseAsync(requestHeaders.toJSON());

        if (!headersValidation.success) {
            return context.set(Keys.authState, undefined);
        } else {
            const {
                authorization: { token }
            } = headersValidation.data;

            try {
                const { account, credential } = await this.clientInstance.verifyToken({
                    token: token
                });

                const authState: TAuthState = Object.freeze({
                    account: account,
                    credential: credential
                });

                return context.set(Keys.authState, authState);
            } catch (error) {
                console.error(error);
                return context.set(Keys.authState, undefined);
            }
        }
    }
}

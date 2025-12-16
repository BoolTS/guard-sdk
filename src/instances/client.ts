import type { TApiResponse } from "../interfaces/base";
import type {
    IClient,
    TClientCredential,
    TClientDefinition,
    TClientOptions
} from "../interfaces/client.interface";

import { SignJWT } from "jose";
import { email } from "zod/v4";
import { Enums } from "../constants";

export class Client implements IClient {
    readonly #baseUri = Enums.ETokenAudiences.SYSTEM;
    readonly #defaultVersion: number = 1;

    private token: string | undefined;

    /**
     * Initialize BoolGuard client instance
     * @param configs
     * @param options
     */
    constructor(
        private readonly params: Readonly<{
            credential: TClientCredential;
            definition?: TClientDefinition;
            options?: TClientOptions;
        }>
    ) {}

    /**
     * Sign JWT token with Ed25519 algorithm
     * @returns
     */
    async signToken() {
        const {
            params: {
                credential: { tenantId, appId, modeId, secretKey },
                options
            }
        } = this;

        try {
            const rawKey = new Uint8Array(Buffer.from(secretKey, "base64"));

            const privateKey = await crypto.subtle.importKey(
                "raw",
                rawKey,
                { name: "HMAC", hash: "SHA-512" },
                false,
                ["sign", "verify"]
            );

            const jwt = await new SignJWT({
                tenantId: tenantId,
                appId: appId,
                modeId: modeId,
                iss: tenantId,
                aud: Enums.ETokenAudiences.SYSTEM
            })
                .setProtectedHeader({ alg: "HS512" })
                .sign(privateKey);

            this.token = jwt;

            return jwt;
        } catch (error) {
            if (options?.logs) {
                console.error("[BoolGuard] Sign token error:", error);
            }

            throw error;
        }
    }

    /**
     * Ping to BoolGuard service to check if the service is reachable
     * This action should be done before any other actions.
     * @returns
     */
    async ping() {
        const {
            token,
            params: {
                credential: { tenantId, appId, modeId },
                options
            }
        } = this;

        try {
            const authToken = token || (await this.signToken());
            const requestHeaders = new Headers();

            requestHeaders.append("X-Tenant-ID", tenantId);
            requestHeaders.append("X-App-ID", appId);
            requestHeaders.append("X-Mode-ID", modeId);
            requestHeaders.append("Authorization", `Bearer ${authToken}`);

            const response = await fetch(
                `${this.#baseUri}/v${
                    options?.version || this.#defaultVersion
                }/tenant-app-modes/ping`,
                {
                    method: "GET",
                    headers: requestHeaders
                }
            );

            if (!response.ok) {
                throw await response.json();
            }

            return response.ok;
        } catch (error) {
            if (options?.logs) {
                console.error("[BoolGuard] Ping error:", error);
            }

            return false;
        }
    }

    /**
     * Create a new plain account with custom account name
     * @param args
     * @returns
     */
    async createPlainAccount({
        identity,
        password,
        metadata
    }: Parameters<IClient["createPlainAccount"]>[number]): ReturnType<
        IClient["createPlainAccount"]
    > {
        const {
            token,
            params: {
                credential: { tenantId, appId, modeId },
                options
            }
        } = this;

        try {
            const authToken = token || (await this.signToken());
            const requestHeaders = new Headers();

            requestHeaders.append("X-Tenant-ID", tenantId);
            requestHeaders.append("X-App-ID", appId);
            requestHeaders.append("X-Mode-ID", modeId);
            requestHeaders.append("Authorization", `Bearer ${authToken}`);
            requestHeaders.append("Content-Type", "application/json");

            const response = await fetch(
                `${this.#baseUri}/v${
                    options?.version || this.#defaultVersion
                }/tenant-app-mode-accounts`,
                {
                    method: "POST",
                    headers: requestHeaders,
                    body: JSON.stringify({
                        data: Object.freeze({
                            type: "plain",
                            identity: identity,
                            password: password,
                            metadata: metadata
                        })
                    })
                }
            );

            if (!response.ok) {
                throw await response.json();
            }

            const { data } = (await response.json()) as TApiResponse<
                IClient["createPlainAccount"]
            >;

            return Object.freeze({
                account: data.account,
                credential: data.credential
            });
        } catch (error) {
            if (options?.logs) {
                console.error("[BoolGuard] Create plain account error:", error);
            }

            throw error;
        }
    }

    /**
     * Create a new email account, this action will create email record and link to account
     * with random account alias generated by system.
     * @param args
     */
    async createEmailAccount({
        identity,
        password,
        metadata
    }: Parameters<IClient["createEmailAccount"]>[number]): ReturnType<
        IClient["createEmailAccount"]
    > {
        const {
            token,
            params: {
                credential: { tenantId, appId, modeId },
                options
            }
        } = this;

        try {
            const authToken = token || (await this.signToken());
            const requestHeaders = new Headers();

            requestHeaders.append("X-Tenant-ID", tenantId);
            requestHeaders.append("X-App-ID", appId);
            requestHeaders.append("X-Mode-ID", modeId);
            requestHeaders.append("Authorization", `Bearer ${authToken}`);
            requestHeaders.append("Content-Type", "application/json");

            const response = await fetch(
                `${this.#baseUri}/v${
                    options?.version || this.#defaultVersion
                }/tenant-app-mode-accounts`,
                {
                    method: "POST",
                    headers: requestHeaders,
                    body: JSON.stringify({
                        data: Object.freeze({
                            type: "email",
                            identity: identity,
                            password: password,
                            metadata: metadata
                        })
                    })
                }
            );

            if (!response.ok) {
                throw await response.json();
            }

            const { data } = (await response.json()) as TApiResponse<
                IClient["createEmailAccount"]
            >;

            return Object.freeze({
                account: data.account,
                credential: data.credential
            });
        } catch (error) {
            if (options?.logs) {
                console.error("[BoolGuard] Create email account error:", error);
            }

            throw error;
        }
    }

    /**
     * Authenticate an account with account name and password
     * This action will return account info and JWT token if successful
     * @param param0
     */
    async authenticate({
        identity,
        password
    }: Parameters<IClient["authenticate"]>[number]): ReturnType<
        IClient["authenticate"]
    > {
        const {
            token,
            params: {
                credential: { tenantId, appId, modeId },
                options
            }
        } = this;

        try {
            const authToken = token || (await this.signToken());
            const emailValidation = await email().safeParseAsync(identity);
            const requestHeaders = new Headers();

            requestHeaders.append("X-Tenant-ID", tenantId);
            requestHeaders.append("X-App-ID", appId);
            requestHeaders.append("X-Mode-ID", modeId);
            requestHeaders.append("Authorization", `Bearer ${authToken}`);
            requestHeaders.append("Content-Type", "application/json");

            const response = await fetch(
                `${this.#baseUri}/v${
                    options?.version || this.#defaultVersion
                }/tenant-app-mode-accounts/authenticate`,
                {
                    method: "POST",
                    headers: requestHeaders,
                    body: JSON.stringify({
                        data: Object.freeze({
                            type: !emailValidation.success ? "plain" : "email",
                            identity: identity,
                            password: password
                        })
                    })
                }
            );

            if (!response.ok) {
                throw await response.json();
            }

            const { data } = (await response.json()) as TApiResponse<
                IClient["authenticate"]
            >;

            return Object.freeze({
                account: data.account,
                credential: data.credential,
                token: data.token
            });
        } catch (error) {
            if (options?.logs) {
                console.error("[BoolGuard] Authenticate error:", error);
            }

            throw error;
        }
    }

    /**
     * Authenticate a token and return account info if token is valid
     * @param param0
     */
    async verifyToken({
        token
    }: Parameters<IClient["verifyToken"]>[number]): ReturnType<
        IClient["verifyToken"]
    > {
        const {
            params: {
                credential: { tenantId, appId, modeId },
                options
            }
        } = this;

        try {
            const authToken = this.token || (await this.signToken());
            const requestHeaders = new Headers();

            requestHeaders.append("X-Tenant-ID", tenantId);
            requestHeaders.append("X-App-ID", appId);
            requestHeaders.append("X-Mode-ID", modeId);
            requestHeaders.append("Authorization", `Bearer ${authToken}`);
            requestHeaders.append("Content-Type", "application/json");

            const response = await fetch(
                `${this.#baseUri}/v${
                    options?.version || this.#defaultVersion
                }/tenant-app-mode-accounts/verify`,
                {
                    method: "POST",
                    headers: requestHeaders,
                    body: JSON.stringify({
                        data: Object.freeze({
                            token: token
                        })
                    })
                }
            );

            if (!response.ok) {
                throw await response.json();
            }

            const { data } = (await response.json()) as TApiResponse<
                IClient["verifyToken"]
            >;

            return Object.freeze({
                account: data.account,
                credential: data.credential
            });
        } catch (error) {
            if (options?.logs) {
                console.error("[BoolGuard] Verify token error:", error);
            }

            throw error;
        }
    }
}

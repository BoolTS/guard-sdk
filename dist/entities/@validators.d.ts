export declare const headersSchema: import("zod/v4").ZodObject<{
    authorization: import("zod/v4").ZodPipe<import("zod/v4").ZodString, import("zod/v4").ZodTransform<Readonly<{
        schema: string;
        token: string;
    }>, string>>;
}, import("zod/v4/core").$strip>;

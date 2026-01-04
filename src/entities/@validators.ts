import { jwt, NEVER, object, string } from "zod/v4";

export const headersSchema = object({
    authorization: string()
        .startsWith("Bearer ")
        .transform((value, ctx) => {
            const [schema, token] = value.split(" ");

            const jwtValidation = jwt().safeParse(token);

            if (!jwtValidation.success) {
                ctx.addIssue("Token must be match jsonwebtoken format.");

                return NEVER;
            }

            return Object.freeze({
                schema,
                token
            });
        })
});

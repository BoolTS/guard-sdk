const prefix = "boolGuard";

export const authState = Symbol.for(`__${prefix}::authState`);
export const guardMetadata = Symbol.for(`__${prefix}::guardMetadata`);
export const service = Symbol.for(`__${prefix}::authService`);
export const guardClient = Symbol.for(`__${prefix}::guardClient`);

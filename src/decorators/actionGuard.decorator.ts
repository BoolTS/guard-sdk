import { Keys } from "../constants";

export const ActionGuard = () => (target: Object, methodName: string) => {
    Reflect.defineMetadata(Keys.guardMetadata, undefined, target, methodName);
};

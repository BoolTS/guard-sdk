import { Keys } from "../constants";

export const ControllerGuard = () => (target: Object) => {
    Reflect.defineMetadata(Keys.guardMetadata, undefined, target);
};

import type { TConstructor } from "../ultils/types";

import { Keys } from "../constants";

export const ControllerGuard =
    <T extends TConstructor<Object>>() =>
    (target: T) => {
        Reflect.defineMetadata(Keys.guardMetadata, undefined, target);
    };

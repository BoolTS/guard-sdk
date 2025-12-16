import type { TActionGuardOptions, TResourceDefinition } from "../types";
import type { TConstructor } from "../ultils/types";

import { Keys } from "../constants";

export const ActionGuard =
    <
        const T extends readonly TResourceDefinition[] = readonly TResourceDefinition[],
        K extends TConstructor<Object> | Object = Object
    >(
        options?: TActionGuardOptions<T>
    ) =>
    (target: K, methodName: string) => {
        Reflect.defineMetadata(
            Keys.guardMetadata,
            options,
            target.constructor,
            methodName
        );
    };

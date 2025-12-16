import type { TConstructor } from "../ultils/types";
export declare const ControllerGuard: <T extends TConstructor<Object>>() => (target: T) => void;

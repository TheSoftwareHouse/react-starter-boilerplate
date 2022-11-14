export type Simplify<T> = T extends object ? { [K in keyof T]: Simplify<T[K]> } : T;

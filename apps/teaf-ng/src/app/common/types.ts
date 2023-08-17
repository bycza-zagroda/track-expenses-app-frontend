export type TServerDateTime = string; // ISO date string like "2022-10-22T09:47:52Z"

export type TServerEntityId = number;

export type TKeysMatching<T extends object, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

import en from './dictionaries/en-US.json';

type Primitive = string | number | boolean | null | undefined;

export type DeepKeys<T> = {
    [K in keyof T & string]: T[K] extends Primitive
        ? K
        : T[K] extends Record<string, any>
          ? `${K}.${DeepKeys<T[K]>}`
          : K;
}[keyof T & string];

export type Dict = typeof en;
export type DictKeys = DeepKeys<Dict>;

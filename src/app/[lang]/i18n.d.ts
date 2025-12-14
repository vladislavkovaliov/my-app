import en from './dictionaries/en-US.json';

export type Dict = typeof en;
export type DictKeys = keyof Dict;

/**
 * 柔軟なオブジェクト
 */
export type Dict<T> = Record<string, T>;

/**
 * Omitよりも厳密に型をチェックする(Omitは余計なプロパティを許容してしまう)
 */
export type Without<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
} & {
  [P in K]?: never;
};

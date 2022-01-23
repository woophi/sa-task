export type BaseRespose<T, Ext extends Record<keyof Ext, unknown> = {}> = {
  message: 'ok' | 'error';
  result: T;
  errors?: Record<string, string[]>;
} & Ext;

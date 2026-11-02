export type KwErrorParams = Record<string, unknown>;
export type KwErrorMessage = string | ((params: KwErrorParams) => string);
export type KwErrorMessages = Record<string, KwErrorMessage>;

export interface KwNormalizedError {
  readonly key: string;
  readonly params: KwErrorParams;
}

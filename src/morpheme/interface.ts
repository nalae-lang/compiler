import { Index, MorphemeToken, TokenBase } from "token/interface";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import MorphemeState from "./MorphemeState";

export interface MorphemeTokenBase extends TokenBase {
  readonly type: MorphemeTokenTypes;
  readonly tokenIndex: Index;
}
export type MorphemeAnalyser<T extends MorphemeToken> = (
  state: MorphemeState<T>,
) => boolean;

export type MorphemeList = [string, string];

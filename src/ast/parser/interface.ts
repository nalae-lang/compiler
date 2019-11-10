import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { Token } from "token/interface";

export interface ParserTokenBase {
  readonly type: ParserTokenTypes;
}

export type ASTParser<T extends ParserTokenBase> = (
  tokens: ReadonlyArray<Token>,
  index: number
) => T | null;

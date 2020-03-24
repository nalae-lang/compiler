import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { Index, Token, TokenBase } from "token/interface";

export interface ParserTokenBase extends TokenBase {
  readonly type: ParserTokenTypes;
  readonly tokenIndex: Index;
}

export type ASTParser<T extends ParserTokenBase> = (
  tokens: ReadonlyArray<Token>,
  index: number,
) => T | null;

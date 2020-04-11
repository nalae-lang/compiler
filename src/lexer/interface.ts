import { Index, TokenBase } from "../token/interface";
import { LexerTokenTypes } from "../token/types/LexerTokenTypes";
import LexerState from "./LexerState";

export interface LexerTokenBase extends TokenBase {
  readonly type: LexerTokenTypes;
  readonly index: Index;
}

export type Lexer = (state: LexerState) => boolean;

import { Index, TokenBase } from "../token/interface";
import { LexerTokenTypes } from "../token/types/LexerTokenTypes";

export interface LexerState {
  code: string;
}

export interface LexerTokenBase extends TokenBase {
  readonly type: LexerTokenTypes;
  readonly index: Index;
}

export abstract class Lexer<T extends TokenBase> {
  public constructor(protected state: LexerState) {}
  public abstract parse(index: number): T | null;
}

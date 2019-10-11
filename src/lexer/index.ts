import { TokenBase } from "../token";

export interface LexerState {
  code: string;
}

export abstract class Lexer<T extends TokenBase> {
  public constructor(protected state: LexerState) {}
  public abstract parse(index: number): T | null;
}

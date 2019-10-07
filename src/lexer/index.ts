import { Token } from '../token';


export interface LexerState {
  code: string;
  codeLength: number;
}

export abstract class Lexer<T extends Token> {
  public constructor(protected state: LexerState) {}
  public abstract parse(index: number): T | null;
}

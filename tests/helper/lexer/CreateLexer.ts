import { Lexer, LexerState } from "lexer/interface";
import { TokenBase } from "token/interface";

export function createLexer<T extends Lexer<TokenBase>>(
  lexer: new (state: LexerState) => T,
  code: string
): T {
  return new lexer({
    code
  });
}

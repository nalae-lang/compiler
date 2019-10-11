import { Lexer, LexerState } from "lexer";
import { TokenBase } from "token";

export function createLexer<T extends Lexer<TokenBase>>(
  lexer: new (state: LexerState) => T,
  code: string
): T {
  return new lexer({
    code
  });
}

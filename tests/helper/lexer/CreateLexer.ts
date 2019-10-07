import { Lexer, LexerState } from "lexer";
import { Token } from "token";

export function createLexer<T extends Lexer<Token>>(
  lexer: new (state: LexerState) => T,
  code: string
): T {
  return new lexer({
    code,
    codeLength: code.length
  });
}

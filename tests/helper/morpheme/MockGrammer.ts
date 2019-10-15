import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export function mockGrammer(text: string): GrammerToken {
  return {
    type: LexerTokenTypes.GRAMMER,
    index: {
      start: 0,
      end: text.length
    },
    text
  };
}

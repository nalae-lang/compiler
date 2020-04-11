import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export interface GrammarToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.GRAMMAR;
  readonly text: string;
}

export const GrammarLexer: Lexer = state => {
  const match = state
    .getCurrentCode()
    .match(/[가-힣a-zA-Z_][가-힣a-zA-Z0-9_]*/);
  if (match?.index === 0) {
    state.addLexerToken({
      type: LexerTokenTypes.GRAMMAR,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + match[0].length,
      },
      text: match[0],
    });
    return true;
  }
  return false;
};

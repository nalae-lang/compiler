import { Lexer } from "lexer/interface";
import { LexerToken } from "../../../src/token/interface";
import LexerState from "../../../src/lexer/LexerState";

export function createLexer(
  lexer: Lexer,
  code: string,
): {
  parse: (index: number) => LexerToken;
} {
  return {
    parse: (index): LexerToken => {
      const state = new LexerState(code);
      state.setIndex(index);
      lexer(state);
      return state.lexerTokens[0];
    },
  };
}

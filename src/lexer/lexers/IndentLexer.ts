import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export type IndentType = "tab" | "space";
export interface IndentToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.INDENT;
  readonly indentType: IndentType;
}

export const IndentLexer: Lexer = state => {
  if (state.getCurrentCode(1).startsWith("\t")) {
    state.addLexerToken({
      type: LexerTokenTypes.INDENT,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + 1,
      },
      indentType: "tab",
    });
    return true;
  }
  if (state.getCurrentCode(2).startsWith("  ")) {
    state.addLexerToken({
      type: LexerTokenTypes.INDENT,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + 2,
      },
      indentType: "space",
    });
    return true;
  }
  if (state.getCurrentCode(1).startsWith(" ")) {
    state.setIndex(state.getIndex() + 1);
    return true;
  }
  return false;
};

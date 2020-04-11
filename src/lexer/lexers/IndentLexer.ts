import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export type IndentType = "tab" | "space";
export interface IndentToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.INDENT;
  readonly indentType: IndentType;
}

export const IndentLexer: Lexer = state => {
  const isIndentAvailable =
    [LexerTokenTypes.INDENT, LexerTokenTypes.END].indexOf(
      state.lexerTokens[state.lexerTokens.length - 1]?.type,
    ) === -1;
  if (state.getCurrentCode(1).startsWith("\t")) {
    if (isIndentAvailable) {
      state.addLexerToken({
        type: LexerTokenTypes.INDENT,
        index: {
          start: state.getIndex(),
          end: state.getIndex() + 1,
        },
        indentType: "tab",
      });
    } else {
      state.setIndex(state.getIndex() + 1);
    }
    return true;
  }
  if (state.getCurrentCode(2).startsWith("  ")) {
    if (isIndentAvailable) {
      state.addLexerToken({
        type: LexerTokenTypes.INDENT,
        index: {
          start: state.getIndex(),
          end: state.getIndex() + 2,
        },
        indentType: "space",
      });
    } else {
      state.setIndex(state.getIndex() + 2);
    }
    return true;
  }
  if (state.getCurrentCode(1).startsWith(" ")) {
    state.setIndex(state.getIndex() + 1);
    return true;
  }
  return false;
};

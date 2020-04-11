import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export type EndType = "dot" | "newLine";
export interface EndToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.END;
  readonly endType: EndType;
}

export const EndLexer: Lexer = state => {
  if (state.getCurrentCode().startsWith("\n")) {
    state.addLexerToken({
      type: LexerTokenTypes.END,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + 1,
      },
      endType: "newLine",
    });
    return true;
  }
  if (state.getCurrentCode().startsWith(".")) {
    state.addLexerToken({
      type: LexerTokenTypes.END,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + 1,
      },
      endType: "dot",
    });
    return true;
  }
  return false;
};

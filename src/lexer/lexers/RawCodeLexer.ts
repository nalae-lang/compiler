import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { NalaeLexerError } from "../error";
import { LexerErrorCode } from "../error/ErrorCode";

export interface RawCodeToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.RAWCODE;
  readonly code: string;
}

export const RawCodeLexer: Lexer = state => {
  if (state.getCurrentCode(1).startsWith("`")) {
    const match = state
      .getCurrentCode()
      .substr(1)
      .match(/[^\\]`/);
    if (match?.index !== undefined) {
      state.addLexerToken({
        type: LexerTokenTypes.RAWCODE,
        index: {
          start: state.getIndex(),
          end: state.getIndex() + match.index + 3,
        },
        code: state.getCurrentCode(match.index + 2).substr(1),
      });
      return true;
    }
    throw new NalaeLexerError(LexerErrorCode.RAWCODE_NOT_END, {
      start: state.getIndex(),
      end: state.getCodeLength(),
    });
  }
  return false;
};

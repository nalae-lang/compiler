import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { NalaeLexerError } from "../error";
import { LexerErrorCode } from "../error/ErrorCode";

export interface StringToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.STRING;
  readonly string: string;
}

export const StringLexer: Lexer = state => {
  if (state.getCurrentCode(1).startsWith('"')) {
    const match = state
      .getCurrentCode()
      .substr(1)
      .match(/[^\\]"/);
    if (match?.index !== undefined) {
      state.addLexerToken({
        type: LexerTokenTypes.STRING,
        index: {
          start: state.getIndex(),
          end: state.getIndex() + match.index + 3,
        },
        string: state.getCurrentCode(match.index + 2).substr(1),
      });
      return true;
    }
    throw new NalaeLexerError(LexerErrorCode.STRING_NOT_END, {
      start: state.getIndex(),
      end: state.getCodeLength(),
    });
  }
  return false;
};

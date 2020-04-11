import { NalaeLexerError } from "lexer/error";
import { LexerErrorCode } from "lexer/error/ErrorCode";
import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export interface CommentToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.COMMENT;
  readonly comment: string;
}

export const CommentLexer: Lexer = state => {
  const code = state.getCurrentCode();
  if (code.startsWith("/*")) {
    const end = code.indexOf("*/", 2);
    if (end > -1) {
      state.addLexerToken({
        type: LexerTokenTypes.COMMENT,
        index: {
          start: state.getIndex(),
          end: state.getIndex() + end + 2,
        },
        comment: code.substr(2, end - 2),
      });
      return true;
    }
    throw new NalaeLexerError(LexerErrorCode.COMMENT_NOT_END, {
      start: state.getIndex(),
      end: state.getCodeLength(),
    });
  }
  if (code.startsWith("//")) {
    const end = code.indexOf("\n", 2);
    state.addLexerToken({
      type: LexerTokenTypes.COMMENT,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + (end > -1 ? end : state.getCodeLength()),
      },
      comment: code.substr(2, end > -1 ? end - 2 : undefined),
    });
    return true;
  }
  return false;
};

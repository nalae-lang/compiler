import { Lexer } from "lexer";
import { NalaeLexerError } from "lexer/error";
import { LexerErrorCode } from "lexer/error/ErrorCode";
import { TokenBase } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export interface CommentToken extends TokenBase {
  readonly type: LexerTokenTypes.COMMENT;
  readonly comment: string;
}

export class CommentLexer extends Lexer<CommentToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.COMMENT;
  public parse(index: number): CommentToken | null {
    const { code } = this.state;

    // 1. /* */ 주석 검사
    if (code[index] === "/" && code[index + 1] === "*") {
      let i = index + 2;
      for (; i < code.length; i++) {
        if (code[i] === "*" && code[i + 1] === "/") {
          return {
            type: LexerTokenTypes.COMMENT,
            index: {
              start: index,
              end: i + 2
            },
            comment: code.substring(index + 2, i)
          };
        }
      }
      throw new NalaeLexerError(LexerErrorCode.COMMENT_NOT_END, {
        start: index,
        end: i
      });
    }

    // 2. '//' 주석 검사
    if (code[index] === "/" && code[index + 1] === "/") {
      let i = index + 2;
      for (; i < code.length; i++) {
        if (code[i] === "\n") {
          break;
        }
      }
      return {
        type: LexerTokenTypes.COMMENT,
        index: {
          start: index,
          end: i
        },
        comment: code.substring(index + 2, i)
      };
    }
    return null;
  }
}

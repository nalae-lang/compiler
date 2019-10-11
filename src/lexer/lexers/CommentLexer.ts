import { Lexer } from "lexer";
import { NalaeLexerError } from "lexer/error";
import { ErrorCode } from "lexer/error/ErrorCode";
import { TokenBase, TokenTypes } from "token";

export interface CommentToken extends TokenBase {
  type: TokenTypes.COMMENT;
  comment: string;
}

export class CommentLexer extends Lexer<CommentToken> {
  public static readonly TOKEN_TYPE = TokenTypes.COMMENT;
  public parse(index: number): CommentToken | null {
    const { code } = this.state;

    // 1. /* */ 주석 검사
    if (code[index] === "/" && code[index + 1] === "*") {
      let i = index + 2;
      for (; i < code.length; i++) {
        if (code[i] === "*" && code[i + 1] === "/") {
          return {
            type: TokenTypes.COMMENT,
            index: {
              start: index,
              end: i + 2
            },
            comment: code.substring(index + 2, i)
          };
        }
      }
      throw new NalaeLexerError(ErrorCode.COMMENT_NOT_END, {
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
        type: TokenTypes.COMMENT,
        index: {
          start: index,
          end: i + 1
        },
        comment: code.substring(index + 2, i)
      };
    }
    return null;
  }
}

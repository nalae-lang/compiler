import { TokenBase, TokenTypes } from "token";
import { Lexer } from "lexer";
import { NalaeLexerError } from "lexer/error";
import { ErrorCode } from "lexer/error/ErrorCode";

export interface RawCodeToken extends TokenBase {
  type: TokenTypes.RAWCODE;
  code: string;
}

export class RawCodeLexer extends Lexer<RawCodeToken> {
  public static readonly TOKEN_TYPE = TokenTypes.RAWCODE;

  public parse(index: number): RawCodeToken | null {
    const { code } = this.state;

    if (code[index] === "`") {
      let i = index + 1;
      for (; i < code.length; i++) {
        if (code[i] === "`" && code[i - 1] != "\\") {
          return {
            type: TokenTypes.RAWCODE,
            index: {
              start: index,
              end: i + 1
            },
            code: code.substring(index + 1, i)
          };
        }
      }
      throw new NalaeLexerError(ErrorCode.RAWCODE_NOT_END, {
        start: index,
        end: i
      });
    }
    return null;
  }
}

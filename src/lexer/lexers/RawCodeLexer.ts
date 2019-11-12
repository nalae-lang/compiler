import { NalaeLexerError } from "lexer/error";
import { LexerErrorCode } from "lexer/error/ErrorCode";
import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export interface RawCodeToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.RAWCODE;
  readonly code: string;
}

export class RawCodeLexer extends Lexer<RawCodeToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.RAWCODE;

  public parse(index: number): RawCodeToken | null {
    const { code } = this.state;

    if (code[index] === "`") {
      let i = index + 1;
      for (; i < code.length; i++) {
        if (code[i] === "`" && code[i - 1] !== "\\") {
          return {
            type: LexerTokenTypes.RAWCODE,
            index: {
              start: index,
              end: i + 1
            },
            code: code.substring(index + 1, i)
          };
        }
      }
      throw new NalaeLexerError(LexerErrorCode.RAWCODE_NOT_END, {
        start: index,
        end: i
      });
    }
    return null;
  }
}

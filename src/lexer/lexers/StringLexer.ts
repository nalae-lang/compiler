import { TokenBase } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { Lexer } from "lexer";
import { NalaeLexerError } from "lexer/error";
import { LexerErrorCode } from "lexer/error/ErrorCode";

export interface StringToken extends TokenBase {
  type: LexerTokenTypes.STRING;
  string: string;
}

export class StringLexer extends Lexer<StringToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.STRING;

  public parse(index: number): StringToken | null {
    const { code } = this.state;

    if (code[index] === '"') {
      let i = index + 1;
      for (; i < code.length; i++) {
        if (code[i] === '"' && code[i - 1] != "\\") {
          return {
            type: LexerTokenTypes.STRING,
            index: {
              start: index,
              end: i + 1
            },
            string: code.substring(index + 1, i)
          };
        }
      }
      throw new NalaeLexerError(LexerErrorCode.STRING_NOT_END, {
        start: index,
        end: i
      });
    }
    return null;
  }
}

import { Token, TokenTypes } from "token";
import { Lexer } from "lexer";
import { NalaeLexerError } from "lexer/error";
import { ErrorCode } from "lexer/error/ErrorCode";

export interface StringToken extends Token {
  type: TokenTypes.STRING;
  string: string;
}

export class StringLexer extends Lexer<StringToken> {
  public parse(index: number): StringToken | null {
    const { code, codeLength } = this.state;

    if (code[index] === '"') {
      let i = index + 1;
      for (; i < codeLength; i++) {
        if (code[i] === '"' && code[i - 1] != "\\") {
          return {
            type: TokenTypes.STRING,
            index: {
              start: index,
              end: i + 1
            },
            string: code.substring(index + 1, i)
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

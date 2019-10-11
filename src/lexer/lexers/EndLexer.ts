import { Lexer } from "lexer";
import { TokenBase, TokenTypes } from "token";

export interface EndToken extends TokenBase {
  endType: "." | "\n";
}

export class EndLexer extends Lexer<EndToken> {
  public static readonly TOKEN_TYPE = TokenTypes.END;

  public parse(index: number): EndToken | null {
    const { code } = this.state;

    // 1. 엔터로 줄을 끝내는 경우
    if (code[index] === "\n") {
      return {
        type: TokenTypes.END,
        index: {
          start: index,
          end: index + 1
        },
        endType: "\n"
      };
    }

    // 2. '.'으로 줄을 끝내는 경우
    if (code[index] === ".") {
      return {
        type: TokenTypes.END,
        index: {
          start: index,
          end: index + 1
        },
        endType: "."
      };
    }

    return null;
  }
}

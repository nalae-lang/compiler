import { Lexer } from "lexer";
import { TokenBase } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export type EndType = "dot" | "newLine";
export interface EndToken extends TokenBase {
  readonly type: LexerTokenTypes.END;
  readonly endType: EndType;
}

export class EndLexer extends Lexer<EndToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.END;

  public parse(index: number): EndToken | null {
    const { code } = this.state;

    // 1. 엔터로 줄을 끝내는 경우
    if (code[index] === "\n") {
      return {
        type: LexerTokenTypes.END,
        index: {
          start: index,
          end: index + 1
        },
        endType: "newLine"
      };
    }

    // 2. '.'으로 줄을 끝내는 경우
    if (code[index] === ".") {
      return {
        type: LexerTokenTypes.END,
        index: {
          start: index,
          end: index + 1
        },
        endType: "dot"
      };
    }

    return null;
  }
}

import { Lexer } from "lexer";
import { Token, TokenTypes } from "token";

export interface CommentToken extends Token {
  endType: "." | "\n";
}

export class EndLexer extends Lexer<CommentToken> {
  public parse(index: number): CommentToken | null {
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

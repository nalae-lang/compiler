import { Token, TokenTypes } from "token";
import { Lexer } from "lexer";

export interface IndentToken extends Token {
  type: TokenTypes.INDENT;
  tabType: "tab" | "space";
}

export class IndentLexer extends Lexer<IndentToken> {
  public parse(index: number): IndentToken | null {
    const { code } = this.state;

    // tab을 사용할 때
    if (code[index] === "\t") {
      return {
        type: TokenTypes.INDENT,
        index: {
          start: index,
          end: index + 1
        },
        tabType: "tab"
      };
    }

    // space 2칸을 사용할 때
    if (code[index] === " " && code[index + 1] === " ") {
      return {
        type: TokenTypes.INDENT,
        index: {
          start: index,
          end: index + 1
        },
        tabType: "space"
      };
    }
    return null;
  }
}

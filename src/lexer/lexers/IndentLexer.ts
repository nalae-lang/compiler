import { TokenBase, TokenTypes, Token } from "token";
import { Lexer } from "lexer";
import { EndToken } from "./EndLexer";

export interface IndentToken extends TokenBase {
  type: TokenTypes.INDENT;
  tabType: "tab" | "space";
}

export class IndentLexer extends Lexer<IndentToken> {
  public static readonly TOKEN_TYPE = TokenTypes.INDENT;

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
          end: index + 2
        },
        tabType: "space"
      };
    }
    return null;
  }

  /**
   * 유효한 IndentToken을 걸러내는 함수
   * */
  public static reduceIndent(tokens: Token[]): Token[] {
    return tokens.filter((token, index) => {
      if (token.type === TokenTypes.INDENT) {
        for (let i = index; i >= 0; i--) {
          if (
            tokens[i].type === TokenTypes.END &&
            (tokens[i] as EndToken).endType === "\n"
          ) {
            return true;
          }
          if (tokens[i].type === TokenTypes.INDENT) {
            continue;
          }
        }
        return false;
      }
      return true;
    });
  }
}

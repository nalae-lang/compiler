import { TokenBase, LexerTokenTypes, Token } from "token";
import { Lexer } from "lexer";
import { EndToken } from "./EndLexer";

export type IndentType = "tab" | "space";
export interface IndentToken extends TokenBase {
  type: LexerTokenTypes.INDENT;
  indentType: IndentType;
}

export class IndentLexer extends Lexer<IndentToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.INDENT;

  public parse(index: number): IndentToken | null {
    const { code } = this.state;

    // tab을 사용할 때
    if (code[index] === "\t") {
      return {
        type: LexerTokenTypes.INDENT,
        index: {
          start: index,
          end: index + 1
        },
        indentType: "tab"
      };
    }

    // space 2칸을 사용할 때
    if (code[index] === " " && code[index + 1] === " ") {
      return {
        type: LexerTokenTypes.INDENT,
        index: {
          start: index,
          end: index + 2
        },
        indentType: "space"
      };
    }
    return null;
  }

  /**
   * 유효한 IndentToken을 걸러내는 함수
   * */
  public static reduceIndent(tokens: Token[]): Token[] {
    return tokens.filter((token, index) => {
      if (token.type === LexerTokenTypes.INDENT) {
        for (let i = index; i >= 0; i--) {
          if (
            tokens[i].type === LexerTokenTypes.END &&
            (tokens[i] as EndToken).endType === "newLine"
          ) {
            return true;
          }
          if (tokens[i].type === LexerTokenTypes.INDENT) {
            continue;
          }
        }
        return false;
      }
      return true;
    });
  }
}

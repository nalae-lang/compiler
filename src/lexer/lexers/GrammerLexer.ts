import { Lexer } from "lexer";
import { TokenBase, TokenTypes } from "token";

export interface GrammerToken extends TokenBase {
  type: TokenTypes.GRAMMER;
  text: string;
}

export class GrammerLexer extends Lexer<GrammerToken> {
  public static readonly TOKEN_TYPE = TokenTypes.GRAMMER;

  public parse(index: number): GrammerToken | null {
    const { code } = this.state;

    const match = code.substr(index).match(/[가-힣a-zA-Z_][가-힣a-zA-Z0-9_]*/);
    if (match && match.index === 0) {
      return {
        type: TokenTypes.GRAMMER,
        index: {
          start: index,
          end: index + match[0].length
        },
        text: match[0]
      };
    }
    return null;
  }
}

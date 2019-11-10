import { Lexer } from "lexer/interface";
import { TokenBase } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export interface GrammerToken extends TokenBase {
  readonly type: LexerTokenTypes.GRAMMAR;
  readonly text: string;
}

export class GrammerLexer extends Lexer<GrammerToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.GRAMMAR;

  public parse(index: number): GrammerToken | null {
    const { code } = this.state;
    const match = code.substr(index).match(/[가-힣a-zA-Z_][가-힣a-zA-Z0-9_]*/);

    if (match?.index === 0) {
      return {
        type: LexerTokenTypes.GRAMMAR,
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

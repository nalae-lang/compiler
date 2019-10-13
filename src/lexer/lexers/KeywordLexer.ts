import { TokenBase, LexerTokenTypes } from "token";
import { keywordList } from "./models/KeywordList";
import { Lexer } from "lexer";
import { operatorList } from "./models/OperatorList";

export interface KeywordToken extends TokenBase {
  type: LexerTokenTypes.KEYWORD;
  name: (typeof keywordList)[number]["name"];
}

export const ALLOWED_KEYWORD_NEXT = ["\n", " ", "\t", ...operatorList];

export class KeywordLexer extends Lexer<KeywordToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.KEYWORD;

  private matchWord(match: string, index: number): boolean {
    const { code } = this.state;

    return (
      match.split("").every((char, charIndex) => {
        return char === code[index + charIndex];
      }) &&
      (code[index + match.length] === undefined ||
        ALLOWED_KEYWORD_NEXT.indexOf(code[index + match.length]) > -1)
    );
  }

  public parse(index: number): KeywordToken | null {
    const find = keywordList.find(keyword => {
      return this.matchWord(keyword.match, index);
    });

    if (find) {
      return {
        type: LexerTokenTypes.KEYWORD,
        index: {
          start: index,
          end: index + find.match.length
        },
        name: find.name
      };
    }

    return null;
  }
}

import { Token, TokenTypes } from "token";
import { KeywordList } from "./models/KeywordList";
import { Lexer } from "lexer";
import { OperatorList } from "./models/OperatorList";

export interface KeywordToken extends Token {
  type: TokenTypes.KEYWORD;
  name: (typeof KeywordList)[number]["name"];
}

export const ALLOWED_KEYWORD_NEXT = ["\n", " ", "\t", ...OperatorList];

export class KeywordLexer extends Lexer<KeywordToken> {
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
    const find = KeywordList.find(keyword => {
      return this.matchWord(keyword.match, index);
    });

    if (find) {
      return {
        type: TokenTypes.KEYWORD,
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

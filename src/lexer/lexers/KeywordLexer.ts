import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { keywordList } from "./models/KeywordList";
import { operatorList } from "./models/OperatorList";

export interface KeywordToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.KEYWORD;
  readonly name: typeof keywordList[number]["name"];
}

export const ALLOWED_KEYWORD_NEXT = ["\n", " ", "\t", ".", ...operatorList];

export const KeywordLexer: Lexer = state => {
  const code = state.getCurrentCode();
  return keywordList.some(keyword => {
    if (code.startsWith(keyword.match)) {
      if (
        code[keyword.match.length] === undefined ||
        ALLOWED_KEYWORD_NEXT.indexOf(code[keyword.match.length]) > -1
      ) {
        state.addLexerToken({
          type: LexerTokenTypes.KEYWORD,
          index: {
            start: state.getIndex(),
            end: state.getIndex() + keyword.match.length,
          },
          name: keyword.name,
        });
        return true;
      }
    }
    return false;
  });
};

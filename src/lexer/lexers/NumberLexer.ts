import { NalaeLexerError } from "lexer/error";
import { LexerErrorCode } from "lexer/error/ErrorCode";
import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export interface NumberToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.NUMBER;
  readonly number: number;
}

export const NumberLexer: Lexer = state => {
  const match = state.getCurrentCode().match(/^-?\d+[\d.]*/);
  if (match?.[0] !== undefined) {
    const number = parseFloat(match[0]);

    // TODO(test): NaN인 테스트 케이스를 추가한다.
    /* istanbul ignore if  */
    if (isNaN(number)) {
      throw new NalaeLexerError(LexerErrorCode.NUMBER_UNKNOWN, {
        start: state.getIndex(),
        end: state.getIndex() + match[0].length,
      });
    }
    state.addLexerToken({
      type: LexerTokenTypes.NUMBER,
      number,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + match[0].length,
      },
    });
    return true;
  }
  return false;
};

import { Lexer, LexerTokenBase } from "lexer/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { operatorList } from "./models/OperatorList";

export interface OperatorToken extends LexerTokenBase {
  readonly type: LexerTokenTypes.OPERATOR;
  readonly operator: typeof operatorList[number];
}

export const OperatorLexer: Lexer = state => {
  const code = state.getCurrentCode(1);
  if (operatorList.indexOf(code[0] as never) > -1) {
    state.addLexerToken({
      type: LexerTokenTypes.OPERATOR,
      index: {
        start: state.getIndex(),
        end: state.getIndex() + 1,
      },
      operator: code[0] as typeof operatorList[number],
    });
    return true;
  }
  return false;
};

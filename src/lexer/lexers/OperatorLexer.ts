import { TokenBase, TokenTypes } from "token";
import { operatorList } from "./models/OperatorList";
import { Lexer } from "lexer";

export interface OperatorToken extends TokenBase {
  type: TokenTypes.OPERATOR;
  operator: (typeof operatorList)[number];
}

export class OperatorLexer extends Lexer<OperatorToken> {
  public static readonly TOKEN_TYPE = TokenTypes.OPERATOR;

  public parse(index: number): OperatorToken | null {
    const { code } = this.state;

    const find = operatorList.find(operator => operator === code[index]);

    if (find) {
      return {
        type: TokenTypes.OPERATOR,
        index: {
          start: index,
          end: index + 1
        },
        operator: find
      };
    }
    return null;
  }
}

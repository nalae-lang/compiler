import { TokenBase } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { operatorList } from "./models/OperatorList";
import { Lexer } from "lexer";

export interface OperatorToken extends TokenBase {
  readonly type: LexerTokenTypes.OPERATOR;
  readonly operator: (typeof operatorList)[number];
}

export class OperatorLexer extends Lexer<OperatorToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.OPERATOR;

  public parse(index: number): OperatorToken | null {
    const { code } = this.state;

    const find = operatorList.find(operator => operator === code[index]);

    if (find !== undefined) {
      return {
        type: LexerTokenTypes.OPERATOR,
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

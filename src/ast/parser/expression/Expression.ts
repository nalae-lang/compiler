// TODO:  ExpressionParser 제작은 보류함
import { ValueToken } from "../../../token/interface";
import { ParserTokenTypes } from "../../types/ParserTokenTypes";
import { ASTParser, ParserTokenBase } from "../interface";
import { BinaryExpressionOperatorToken } from "./BinaryExpression";

export interface ExpressionToken extends ParserTokenBase {
  readonly type: ParserTokenTypes.EXPRESSION;
  readonly left: ExpressionToken | ValueToken;
  readonly right: ExpressionToken | ValueToken;
  readonly operator: BinaryExpressionOperatorToken;
  readonly isParenthesized: boolean;
}

export const ExpressionParser: ASTParser<ExpressionToken> = (tokens, index) => {
  const token = tokens[index];

  // // '('로 시작하는 경우
  // if (token?.type === LexerTokenTypes.OPERATOR && token.operator === "(") {
  // }

  // if (
  //   token?.type === LexerTokenTypes.NUMBER &&
  //   isBinaryExpressionOperatorToken(tokens[index + 1])
  // ) {
  // }

  return null;
};

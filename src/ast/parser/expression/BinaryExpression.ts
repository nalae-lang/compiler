import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { OperatorToken } from "lexer/lexers/OperatorLexer";
import { Token, ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { isValueToken } from "utils/IsValueToken";

import { NalaeASTParserError } from "../error";
import { ASTParserErrorCode } from "../error/ErrorCode";
import { ASTParser, ParserTokenBase } from "../interface";

interface BinaryExpressionToken extends ParserTokenBase {
  readonly type: ParserTokenTypes.BINARY_EXPRESSION;
  readonly left: ValueToken | BinaryExpressionToken;
  readonly right: ValueToken | BinaryExpressionToken;
  readonly operator: BinaryExpressionOperatorToken;
}

const binaryExpressionableOperatorToken = ["+", "-", "*", "/", "%"] as const;

interface BinaryExpressionOperatorToken extends OperatorToken {
  operator: typeof binaryExpressionableOperatorToken[number];
}

function isBinaryExpressionOperatorToken(
  token: Token | undefined
): token is BinaryExpressionOperatorToken {
  return (
    token !== undefined &&
    token.type === LexerTokenTypes.OPERATOR &&
    (binaryExpressionableOperatorToken as ReadonlyArray<string>).indexOf(
      token.operator
    ) > -1
  );
}

export const BinaryExpressionParser: ASTParser<BinaryExpressionToken> = (
  tokens,
  index
) => {
  if (
    isValueToken(tokens[index]) &&
    isBinaryExpressionOperatorToken(tokens[index + 1])
  ) {
    if (isValueToken(tokens[index + 2])) {
      return {
        type: ParserTokenTypes.BINARY_EXPRESSION,
        left: tokens[index] as ValueToken,
        operator: tokens[index + 1] as BinaryExpressionOperatorToken,
        right: tokens[index + 2] as ValueToken
      };
    }

    const errorToken =
      tokens[index + 2] !== undefined ? tokens[index + 2] : tokens[index + 1];
    throw new NalaeASTParserError(
      ASTParserErrorCode.EXPRESSION_NEED,
      errorToken.index
    );
  }
  return null;
};

import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { OperatorToken } from "lexer/lexers/OperatorLexer";
import { Token, ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { isValueToken } from "utils/IsValueToken";

import { NalaeASTParserError } from "../error";
import { ASTParserErrorCode } from "../error/ErrorCode";
import { ASTParser, ParserTokenBase } from "../interface";

export interface BinaryExpressionToken extends ParserTokenBase {
  readonly type: ParserTokenTypes.BINARY_EXPRESSION;
  readonly left: ValueToken;
  readonly right: ValueToken;
  readonly operator: BinaryExpressionOperatorToken;
}

const binaryExpressionOperatorToken = ["+", "-", "*", "/", "%"] as const;

export interface BinaryExpressionOperatorToken extends OperatorToken {
  operator: typeof binaryExpressionOperatorToken[number];
}

export function isBinaryExpressionOperatorToken(
  token: Token | undefined
): token is BinaryExpressionOperatorToken {
  return (
    token?.type === LexerTokenTypes.OPERATOR &&
    (binaryExpressionOperatorToken as ReadonlyArray<string>).indexOf(
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
        right: tokens[index + 2] as ValueToken,
        index: {
          start: tokens[index].index.start,
          end: tokens[index + 2].index.end
        },
        tokenIndex: {
          start: index,
          end: index + 2
        }
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

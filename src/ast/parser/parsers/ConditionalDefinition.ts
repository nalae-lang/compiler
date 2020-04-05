import { ASTParser, ParserTokenBase } from "../interface";
import { ParserTokenTypes } from "../../types/ParserTokenTypes";
import { ValueToken } from "../../../token/interface";
import { MorphemeTokenTypes } from "../../../token/types/MorphemeTokenTypes";
import { isValueToken } from "../../../utils/IsValueToken";
import { keywordList } from "../../../lexer/lexers/models/KeywordList";
import { LexerTokenTypes } from "../../../token/types/LexerTokenTypes";
import { NalaeASTParserError } from "../error";
import { ASTParserErrorCode } from "../error/ErrorCode";

const ConditionalOperatorList: Array<typeof keywordList[number]["name"]> = [
  "==",
  "!=",
  ">",
  "<",
  ">=",
  "<=",
];

export interface ConditionalDefinitionToken extends ParserTokenBase {
  readonly type: ParserTokenTypes.CONDITIONAL_EXPRESSION;
  readonly leftValue: ValueToken;
  readonly rightValue: ValueToken;
  readonly operator: typeof ConditionalOperatorList[number];
}

export const ConditionalDefinitionParser: ASTParser<ConditionalDefinitionToken> = (
  tokens,
  index,
) => {
  const token = tokens[index];

  if (
    token.type === MorphemeTokenTypes.SUBJECT &&
    ["이", "가"].indexOf(token.endType) > -1
  ) {
    const rightValueToken = tokens[index + 1];
    if (isValueToken(rightValueToken)) {
      const operatorToken = tokens[index + 2];
      if (
        operatorToken.type === LexerTokenTypes.KEYWORD &&
        ConditionalOperatorList.indexOf(operatorToken.name) > -1
      ) {
        const commaToken = tokens[index + 3];
        if (
          commaToken.type === LexerTokenTypes.OPERATOR &&
          commaToken.operator === ","
        ) {
          if (token.subject === null) {
            throw new NalaeASTParserError(
              ASTParserErrorCode.CONDITIONAL_DEFINITION_SUBJECT_NEED,
              {
                start: token,
                end: commaToken,
              },
            );
          }
          return {
            type: ParserTokenTypes.CONDITIONAL_EXPRESSION,
            leftValue: token.subject,
            rightValue: rightValueToken,
            operator: operatorToken.name as typeof ConditionalOperatorList[number],
            tokenIndex: {
              start: token,
              end: commaToken,
            },
            index: {
              start: token.index.start,
              end: commaToken.index.end,
            },
          };
        }
      }
    }
  }
  return null;
};

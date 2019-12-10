import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { OperatorToken } from "lexer/lexers/OperatorLexer";
import { MorphemeList } from "morpheme/interface";
import { ArgumentToken } from "morpheme/morphemes/ArgumentMorpheme";
import { IdentifierToken } from "morpheme/morphemes/IdentifierMorpheme";
import { SubjectToken } from "morpheme/morphemes/SubjectMorpheme";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

import { NalaeASTParserError } from "../error";
import { ASTParserErrorCode } from "../error/ErrorCode";
import { ASTParser, ParserTokenBase } from "../interface";

export const FunctionNameEnd: MorphemeList = ["을", "를"];

export interface FunctionDefinitionToken extends ParserTokenBase {
  readonly type: ParserTokenTypes.FUNCTION_DEFINITION;
  readonly subject: SubjectToken;
  readonly name: IdentifierToken;
  readonly arguments: ReadonlyArray<ArgumentToken | IdentifierToken>;
}

export const FunctionDefinitionParser: ASTParser<FunctionDefinitionToken> = (
  tokens,
  index,
) => {
  const token = tokens[index];

  if (
    token.type === LexerTokenTypes.KEYWORD &&
    token.name === "function_define"
  ) {
    const argumentList: Array<ArgumentToken | IdentifierToken> = [];
    let i = index - 2;
    for (; ; i--) {
      if (tokens[i]?.type === LexerTokenTypes.END || i < 0) {
        throw new NalaeASTParserError(
          ASTParserErrorCode.FUNCTION_DEFINE_SUBJECT_NEED,
          { start: tokens[i].index.end, end: token.index.end },
          { start: i, end: index },
        );
      } else if (
        tokens[i]?.type === MorphemeTokenTypes.ARGUMENT ||
        tokens[i]?.type === MorphemeTokenTypes.IDENTIFIER
      ) {
        argumentList.push(tokens[i] as ArgumentToken | IdentifierToken);
      } else if (tokens[i]?.type === MorphemeTokenTypes.SUBJECT) {
        break;
      } else {
        throw new NalaeASTParserError(
          ASTParserErrorCode.FUNCTION_DEFINE_UNKNOWN_TOKEN,
          { start: tokens[i].index.end, end: token.index.end },
          { start: i, end: index },
        );
      }
    }
    const subjectToken = tokens[i] as SubjectToken;
    // 반대로 들어갔으므로 뒤집음
    argumentList.reverse();

    if (
      tokens[index + 1].type === LexerTokenTypes.OPERATOR &&
      (tokens[index + 1] as OperatorToken).operator === ","
    ) {
      const nameToken = tokens[index - 1];
      if (
        nameToken.type === MorphemeTokenTypes.IDENTIFIER &&
        checkPostPosition(nameToken.name, FunctionNameEnd) !== false
      ) {
        return {
          type: ParserTokenTypes.FUNCTION_DEFINITION,
          arguments: argumentList,
          tokenIndex: {
            start: i,
            end: index + 2,
          },
          index: {
            start: subjectToken.index.start,
            end: subjectToken.index.end,
          },
          name: {
            ...nameToken,
            index: {
              start: token.index.start,
              end: token.index.end - 1,
            },
            name: nameToken.name.substr(0, nameToken.name.length - 1),
          },
          subject: subjectToken,
          // TODO: Function Body부분 나중에 추가
        };
      } else {
        throw new NalaeASTParserError(
          tokens[index - 1].type === MorphemeTokenTypes.IDENTIFIER
            ? ASTParserErrorCode.FUNCTION_DEFINE_NAME_NOT_FORMATTED
            : ASTParserErrorCode.FUNCTION_DEFINE_NAME_NOT_EXISTS,
          { start: tokens[index - 1].index.start, end: token.index.end },
          { start: index - 1, end: index + 1 },
        );
      }
    } else {
      throw new NalaeASTParserError(
        ASTParserErrorCode.FUNCTION_DEFINE_COMMA_NOT_EXISTS,
        token.index,
        { start: index, end: index + 1 },
      );
    }
  }
  return null;
};

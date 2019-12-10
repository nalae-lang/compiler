import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { IdentifierToken } from "morpheme/morphemes/IdentifierMorpheme";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

import { ASTParser, ParserTokenBase } from "../interface";

export interface VariableDefinitionToken extends ParserTokenBase {
  readonly type: ParserTokenTypes.VARIABLE_DEFINITION;
  readonly name: IdentifierToken;
  readonly value: ValueToken | null;
}

export const VariableDefinitionParser: ASTParser<VariableDefinitionToken> = (
  tokens,
  index,
) => {
  const token = tokens[index];

  if (
    token.type === MorphemeTokenTypes.IDENTIFIER &&
    checkPostPosition(token.name, ["을", "를"]) !== false
  ) {
    if (tokens[index + 1]?.type === MorphemeTokenTypes.SUBSTITUTE) {
      const defineKeywordToken = tokens[index + 2];
      if (
        defineKeywordToken.type === LexerTokenTypes.KEYWORD &&
        defineKeywordToken.name === "variable_define"
      ) {
        return {
          type: ParserTokenTypes.VARIABLE_DEFINITION,
          index: {
            start: token.index.start,
            end: defineKeywordToken.index.end,
          },
          name: {
            type: MorphemeTokenTypes.IDENTIFIER,
            index: {
              start: token.index.start,
              end: token.index.end - 1,
            },
            name: token.name.substr(0, token.name.length - 1),
            tokenIndex: token.tokenIndex,
          },
          tokenIndex: {
            start: index,
            end: index + 2,
          },
          value: null,
        };
      }
    }
  }
  return null;
};
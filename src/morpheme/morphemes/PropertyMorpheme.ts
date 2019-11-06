import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { isValueToken } from "utils/IsValueToken";

export interface PropertyToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.PROPERTY;
  readonly object: ValueToken;
}

export class PropertyMorpheme extends MorphemeAnalyser<PropertyToken> {
  public analyze(index: number): PropertyToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.GRAMMER) {
      if (token.text === "의" && isValueToken(tokens[index - 1])) {
        return {
          type: MorphemeTokenTypes.PROPERTY,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          object: tokens[index - 1] as ValueToken
        };
      }
      if (token.text.length > 2 && token.text[token.text.length - 1] === "의") {
        return {
          type: MorphemeTokenTypes.PROPERTY,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          object: {
            type: MorphemeTokenTypes.IDENTIFIER,
            index: {
              start: token.index.start,
              end: token.index.end - 1
            },
            tokenIndex: {
              start: index,
              end: index + 1
            },
            name: token.text.substr(0, token.text.length - 1)
          }
        };
      }
    }
    return null;
  }
}

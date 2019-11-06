import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { hasJongSung } from "utils/HasJongSung";
import { isKorean } from "utils/IsKorean";
import { isValueToken } from "utils/IsValueToken";

export interface DefineToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.DEFINE;
  readonly value: ValueToken;
}

export const DefineMorphemeList = ["이다", "다"];
export class DefineMorpheme extends MorphemeAnalyser<DefineToken> {
  public analyze(index: number): DefineToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.GRAMMER) {
      if (
        token.text === DefineMorphemeList[0] &&
        isValueToken(tokens[index - 1])
      ) {
        return {
          type: MorphemeTokenTypes.DEFINE,
          index: token.index,
          tokenIndex: {
            start: index - 1,
            end: index + 1
          },
          value: tokens[index - 1] as ValueToken
        };
      }

      if (token.text.length > 2 && token.text.endsWith(DefineMorphemeList[0])) {
        return {
          type: MorphemeTokenTypes.DEFINE,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          value: {
            type: MorphemeTokenTypes.IDENTIFIER,
            index: {
              start: token.index.start,
              end: token.index.end - 2
            },
            tokenIndex: {
              start: index,
              end: index + 1
            },
            name: token.text.substr(0, token.text.length - 2)
          }
        };
      }

      if (token.text.length > 1 && token.text.endsWith(DefineMorphemeList[1])) {
        const lastChar = token.text[token.text.length - 2];
        if (!isKorean(lastChar) || !hasJongSung(lastChar)) {
          return {
            type: MorphemeTokenTypes.DEFINE,
            index: token.index,
            tokenIndex: {
              start: index,
              end: index + 1
            },
            value: {
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
    }

    return null;
  }
}

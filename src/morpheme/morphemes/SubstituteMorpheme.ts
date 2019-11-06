import {
  MorphemeAnalyser,
  MorphemeList,
  MorphemeTokenBase
} from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";
import { isValueToken } from "utils/IsValueToken";

export interface SubstituteToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.SUBSTITUTE;
  readonly value: ValueToken;
}

export const SubstituteMorphemeList: MorphemeList = ["으로", "로"];

export class SubstituteMorpheme extends MorphemeAnalyser<SubstituteToken> {
  public analyze(index: number): SubstituteToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.GRAMMER) {
      if (
        SubstituteMorphemeList.indexOf(token.text) > -1 &&
        isValueToken(tokens[index - 1])
      ) {
        return {
          type: MorphemeTokenTypes.SUBSTITUTE,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          value: tokens[index - 1] as ValueToken
        };
      }
      const match = checkPostPosition(token.text, SubstituteMorphemeList);

      if (match !== false) {
        const morphemeLength = SubstituteMorphemeList[match].length;
        return {
          type: MorphemeTokenTypes.SUBSTITUTE,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          value: {
            type: MorphemeTokenTypes.IDENTIFIER,
            index: {
              start: token.index.start,
              end: token.index.end - morphemeLength
            },
            tokenIndex: {
              start: index,
              end: index + 1
            },
            name: token.text.substr(0, token.text.length - morphemeLength)
          }
        };
      }
    }
    return null;
  }
}

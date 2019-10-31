import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { MorphemeAnalyser, MorphemeList } from "morpheme/interface";
import { TokenBase } from "token/interface";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

import { IdentifierToken } from "./IdentifierMorpheme";

export interface SubstituteToken extends TokenBase {
  readonly type: MorphemeTokenTypes.SUBSTITUTE;
  readonly value: IdentifierToken | null;
}

export const SubstituteMorphemeList: MorphemeList = ["으로", "로"];

export class SubstituteMorpheme implements MorphemeAnalyser<SubstituteToken> {
  public analyze(token: GrammerToken): SubstituteToken | null {
    if (SubstituteMorphemeList.indexOf(token.text) > -1) {
      return {
        type: MorphemeTokenTypes.SUBSTITUTE,
        index: token.index,
        value: null
      };
    }

    const match = checkPostPosition(token.text, SubstituteMorphemeList);

    if (match !== false) {
      const morphemeLength = SubstituteMorphemeList[match].length;
      return {
        type: MorphemeTokenTypes.SUBSTITUTE,
        index: token.index,
        value: {
          type: MorphemeTokenTypes.IDENTIFIER,
          index: {
            start: token.index.start,
            end: token.index.end - morphemeLength
          },
          name: token.text.substr(0, token.text.length - morphemeLength)
        }
      };
    }
    return null;
  }
}

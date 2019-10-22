import { TokenBase } from "token";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { MorphemeAnalyser } from "morpheme";
import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { NalaeMorphemeError } from "./error";
import { MorphemeErrorCode } from "./error/ErrorCode";
import { checkPostPosition } from "utils/CheckPostPosition";
import { IdentifierToken } from "./IdentifierMorpheme";

export interface NamedToken extends TokenBase {
  type: MorphemeTokenTypes.NAMED;
  name: string;
  subject: IdentifierToken;
}

export const NamedMorphemeList: [string, string] = ["이라는", "라는"];

export class NamedMorpheme implements MorphemeAnalyser<NamedToken> {
  public analyze(token: GrammerToken): NamedToken | null {
    if (NamedMorphemeList.indexOf(token.text) > -1) {
      throw new NalaeMorphemeError(
        MorphemeErrorCode.NAMED_SUBJECT_NOT_EXISTS,
        token.index
      );
    }
    if (checkPostPosition(token.text, NamedMorphemeList)) {
      const morphemeLength = token.text.endsWith(NamedMorphemeList[0]) ? 3 : 2;

      return {
        type: MorphemeTokenTypes.NAMED,
        subject: {
          type: MorphemeTokenTypes.IDENTIFIER,
          index: {
            start: token.index.start,
            end: token.index.end - morphemeLength
          },
          name: token.text.substr(0, token.text.length - morphemeLength)
        },
        index: token.index,
        name: NamedMorphemeList[morphemeLength === 3 ? 0 : 1]
      };
    }
    return null;
  }
}

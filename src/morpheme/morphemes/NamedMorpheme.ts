import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { MorphemeAnalyser } from "morpheme/interface";
import { TokenBase } from "token/interface";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

import { NalaeMorphemeError } from "./error";
import { MorphemeErrorCode } from "./error/ErrorCode";
import { IdentifierToken } from "./IdentifierMorpheme";

export interface NamedToken extends TokenBase {
  readonly type: MorphemeTokenTypes.NAMED;
  readonly name: string;
  readonly subject: IdentifierToken;
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
    const match = checkPostPosition(token.text, NamedMorphemeList);
    if (match !== false) {
      return {
        type: MorphemeTokenTypes.NAMED,
        subject: {
          type: MorphemeTokenTypes.IDENTIFIER,
          index: {
            start: token.index.start,
            end: token.index.end - NamedMorphemeList[match].length
          },
          name: token.text.substr(
            0,
            token.text.length - NamedMorphemeList[match].length
          )
        },
        index: token.index,
        name: NamedMorphemeList[match]
      };
    }
    return null;
  }
}

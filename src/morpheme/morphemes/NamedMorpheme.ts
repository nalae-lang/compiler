import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

import { NalaeMorphemeError } from "./error";
import { MorphemeErrorCode } from "./error/ErrorCode";
import { IdentifierToken } from "./IdentifierMorpheme";

export interface NamedToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.NAMED;
  readonly name: string;
  readonly subject: IdentifierToken;
}

export const NamedMorphemeList: [string, string] = ["이라는", "라는"];

export class NamedMorpheme extends MorphemeAnalyser<NamedToken> {
  public analyze(index: number): NamedToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.GRAMMAR) {
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
            tokenIndex: {
              start: index,
              end: index + 1
            },
            name: token.text.substr(
              0,
              token.text.length - NamedMorphemeList[match].length
            )
          },
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          name: NamedMorphemeList[match]
        };
      }
    }
    return null;
  }
}

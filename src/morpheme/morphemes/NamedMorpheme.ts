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

export const NamedMorpheme: MorphemeAnalyser<NamedToken> = state => {
  const token = state.getLexerToken();

  if (token?.type === LexerTokenTypes.GRAMMAR) {
    if (NamedMorphemeList.indexOf(token.text) > -1) {
      throw new NalaeMorphemeError(
        MorphemeErrorCode.NAMED_SUBJECT_NOT_EXISTS,
        token.index,
      );
    }
    const match = checkPostPosition(token.text, NamedMorphemeList);
    if (match !== false) {
      state.addMorphemeToken({
        type: MorphemeTokenTypes.NAMED,
        subject: {
          type: MorphemeTokenTypes.IDENTIFIER,
          tokenIndex: {
            start: state.getIndex(),
            end: state.getIndex() + 1,
          },
          index: {
            start: token.index.start,
            end: token.index.end - NamedMorphemeList[match].length,
          },
          name: token.text.substr(
            0,
            token.text.length - NamedMorphemeList[match].length,
          ),
        },
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 1,
        },
        name: NamedMorphemeList[match],
      });
      return true;
    }
  }
  return false;
};

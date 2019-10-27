import { TokenBase } from "token";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { MorphemeAnalyser } from "morpheme";
import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { IdentifierToken } from "./IdentifierMorpheme";
import { isKorean } from "utils/IsKorean";
import { hasJongSung } from "utils/HasJongSung";

export interface DefineToken extends TokenBase {
  readonly type: MorphemeTokenTypes.DEFINE;
  readonly value: IdentifierToken | null;
}

export const DefineMorphemeList = ["이다", "다"];

export class DefineMorpheme implements MorphemeAnalyser<DefineToken> {
  public analyze(token: GrammerToken): DefineToken | null {
    if (token.text === DefineMorphemeList[0]) {
      return {
        type: MorphemeTokenTypes.DEFINE,
        index: token.index,
        value: null
      };
    }

    if (token.text.length > 2 && token.text.endsWith(DefineMorphemeList[0])) {
      return {
        type: MorphemeTokenTypes.DEFINE,
        index: token.index,
        value: {
          type: MorphemeTokenTypes.IDENTIFIER,
          index: {
            start: token.index.start,
            end: token.index.end - 2
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
          value: {
            type: MorphemeTokenTypes.IDENTIFIER,
            index: {
              start: token.index.start,
              end: token.index.end - 1
            },
            name: token.text.substr(0, token.text.length - 1)
          }
        };
      }
    }

    return null;
  }
}

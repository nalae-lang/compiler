import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { isValueToken } from "utils/IsValueToken";
import { hasJongSung } from "utils/HasJongSung";

export interface AssertToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.ASSERT;
  readonly value: ValueToken;
}

export const AssertMorphemeList = ["이다", "다"];

export const AssertMorpheme: MorphemeAnalyser<AssertToken> = state => {
  const token = state.getLexerToken();

  if (isValueToken(token)) {
    const nextToken = state.getLexerToken(1);
    if (
      nextToken?.type === LexerTokenTypes.GRAMMAR &&
      AssertMorphemeList.indexOf(nextToken.text) > -1 &&
      state.getLexerToken(2)?.type === LexerTokenTypes.END
    ) {
      state.addMorphemeToken({
        type: MorphemeTokenTypes.ASSERT,
        value: token,
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 2,
        },
      });
      return true;
    }
  }
  if (token?.type === LexerTokenTypes.GRAMMAR) {
    if (
      token.text.length > AssertMorphemeList[1].length &&
      token.text.endsWith(AssertMorphemeList[1]) &&
      state.getLexerToken(1)?.type === LexerTokenTypes.END
    ) {
      // '~이다' 로 끝날 때
      if (
        token.text.length > AssertMorphemeList[0].length &&
        token.text.endsWith(AssertMorphemeList[0])
      ) {
        state.addMorphemeToken({
          type: MorphemeTokenTypes.ASSERT,
          value: {
            type: MorphemeTokenTypes.IDENTIFIER,
            name: token.text.substr(
              0,
              token.text.length - AssertMorphemeList[0].length,
            ),
            index: {
              start: token.index.start,
              end: token.index.end - AssertMorphemeList[0].length,
            },
            tokenIndex: {
              start: state.getIndex(),
              end: state.getIndex() + 1,
            },
          },
          tokenIndex: {
            start: state.getIndex(),
            end: state.getIndex() + 1,
          },
        });
        return true;
      }
      // ~다로 끝나는데, 앞 단어가 종성으로 끝날 때는 무시한다. ex) 사람다.
      if (
        hasJongSung(
          token.text[token.text.length - AssertMorphemeList[1].length - 1],
        )
      ) {
        return false;
      }
      state.addMorphemeToken({
        type: MorphemeTokenTypes.ASSERT,
        value: {
          type: MorphemeTokenTypes.IDENTIFIER,
          name: token.text.substr(
            0,
            token.text.length - AssertMorphemeList[1].length,
          ),
          index: {
            start: token.index.start,
            end: token.index.end - AssertMorphemeList[1].length,
          },
          tokenIndex: {
            start: state.getIndex(),
            end: state.getIndex() + 1,
          },
        },
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 1,
        },
      });
      return true;
    }
  }
  return false;
};

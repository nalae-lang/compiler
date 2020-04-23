import { MorphemeAnalyser } from "morpheme/interface";
import { LexerToken, MorphemeToken, Token } from "token/interface";
import MorphemeState from "../../../src/morpheme/MorphemeState";

export function createMorpheme(
  morpheme: MorphemeAnalyser<MorphemeToken>,
  tokens: ReadonlyArray<LexerToken>,
): {
  analyze: (index: number) => Token;
} {
  return {
    analyze: (index: number): Token => {
      const state = new MorphemeState(tokens);
      state.setIndex(index);
      morpheme(state);
      return state.morphemeTokens[0] ?? null;
    },
  };
}

import { MorphemeAnalyser, MorphemeState } from "morpheme/interface";
import { MorphemeTokenBase, Token } from "token/interface";

export function createMorpheme<T extends MorphemeAnalyser<MorphemeTokenBase>>(
  morpheme: new (state: MorphemeState) => T,
  tokens: Array<Token>
): T {
  return new morpheme({
    tokens
  });
}

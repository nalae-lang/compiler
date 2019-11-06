import {
  MorphemeAnalyser,
  MorphemeState,
  MorphemeTokenBase
} from "morpheme/interface";
import { Token } from "token/interface";

export function createMorpheme<T extends MorphemeAnalyser<MorphemeTokenBase>>(
  morpheme: new (state: MorphemeState) => T,
  tokens: Array<Token>
): T {
  return new morpheme({
    tokens
  });
}

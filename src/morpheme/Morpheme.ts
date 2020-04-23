import { MorphemeAnalyser } from "morpheme/interface";
import { LexerToken, MorphemeToken, Token } from "token/interface";
import {
  ArgumentMorpheme,
  AssertMorpheme,
  IdentifierMorpheme,
  NamedMorpheme,
  PropertyMorpheme,
  SubjectMorpheme,
  SubstituteMorpheme,
} from "./morphemes";
import MorphemeState from "./MorphemeState";

const morphemeList: Array<MorphemeAnalyser<MorphemeToken>> = [
  NamedMorpheme,
  PropertyMorpheme,
  ArgumentMorpheme,
  SubjectMorpheme,
  AssertMorpheme,
  SubstituteMorpheme,
  IdentifierMorpheme,
];

export default function nalaeMorphemeAnalyze(
  lexerTokens: ReadonlyArray<LexerToken>,
): ReadonlyArray<Token> {
  const morphemeState = new MorphemeState(lexerTokens);
  while (morphemeState.isLexable()) {
    if (!morphemeList.some(morpheme => morpheme(morphemeState))) {
      const currentToken = morphemeState.getLexerToken();
      /* istanbul ignore if  */
      if (currentToken === undefined) {
        break;
      }
      morphemeState.morphemeTokens.push(currentToken);
      morphemeState.setIndex(morphemeState.getIndex() + 1);
    }
  }
  return morphemeState.morphemeTokens;
}

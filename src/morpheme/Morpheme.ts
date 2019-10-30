import { SubjectMorpheme } from "./morphemes/SubjectMorpheme";
import { PropertyMorpheme } from "./morphemes/PropertyMorpheme";
import { MorphemeAnalyser } from "morpheme";
import { Token } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { DefineMorpheme } from "./morphemes/DefineMorpheme";
import { NamedMorpheme } from "./morphemes/NamedMorpheme";
import { IdentifierMorpheme } from "./morphemes/IdentifierMorpheme";

export class NalaeMorphemeAnalyser {
  private readonly morphemes: Array<MorphemeAnalyser<Token>> = [
    new NamedMorpheme(),
    new PropertyMorpheme(),
    new SubjectMorpheme(),
    new DefineMorpheme(),
    new IdentifierMorpheme()
  ];

  public analyse(tokens: Array<Token>): Array<Token> {
    return tokens.map(token => {
      if (token.type === LexerTokenTypes.GRAMMER) {
        let result = null as Token | null;
        this.morphemes.find(morpheme => (result = morpheme.analyze(token)));

        /*
          istanbul ignore else
          GrammerToken인 경우 맞는 형태소를 못 찾으면 무조건 IdentifierMorpheme로 정한다.
          그래서 사실상 result가 null인 경우는 없어 else coverage는 무시함.
        */
        if (result !== null) {
          return result;
        }
      }
      return token;
    });
  }
}

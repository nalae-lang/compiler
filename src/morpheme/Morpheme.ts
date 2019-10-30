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
        if (result !== null) {
          return result;
        }
      }
      return token;
    });
  }
}

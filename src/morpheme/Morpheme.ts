import { SubjectMorpheme } from "./morphemes/SubjectMorpheme";
import { PropertyMorpheme } from "./morphemes/PropertyMorpheme";
import { MorphemeAnalyser } from "morpheme";
import { Token } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export class NalaeMorphemeAnalyser {
  private readonly morphemes: Array<MorphemeAnalyser<Token>> = [
    new SubjectMorpheme(),
    new PropertyMorpheme()
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

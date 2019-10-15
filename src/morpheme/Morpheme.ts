import { SubjectMorpheme } from "./morphemes/SubjectMorpheme";
import { PropertyMorpheme } from "./morphemes/PropertyMorpheme";
import { MorphemeAnalyser } from "morpheme";
import { Token } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export class NalaeMorphemeAnalyser {
  private readonly morphemes: MorphemeAnalyser<Token>[] = [
    new SubjectMorpheme(),
    new PropertyMorpheme()
  ];

  public analyse(tokens: Token[]): Token[] {
    return tokens.map(token => {
      if (token.type === LexerTokenTypes.GRAMMER) {
        let result = null as Token | null;
        this.morphemes.find(morpheme => (result = morpheme.analyze(token)));
        if (result) {
          return result;
        }
      }
      return token;
    });
  }
}

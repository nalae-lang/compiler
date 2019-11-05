import { MorphemeAnalyser, MorphemeState } from "morpheme/interface";
import { MorphemeTokenBase, Token } from "token/interface";

import { DefineMorpheme } from "./morphemes/DefineMorpheme";
import { IdentifierMorpheme } from "./morphemes/IdentifierMorpheme";
import { NamedMorpheme } from "./morphemes/NamedMorpheme";
import { PropertyMorpheme } from "./morphemes/PropertyMorpheme";
import { SubjectMorpheme } from "./morphemes/SubjectMorpheme";
import { SubstituteMorpheme } from "./morphemes/SubstituteMorpheme";

export class NalaeMorphemeAnalyser {
  private readonly state: MorphemeState;
  private readonly morphemes: Array<MorphemeAnalyser<MorphemeTokenBase>>;

  public constructor(tokens: Array<Token>) {
    this.state = {
      tokens
    };
    this.morphemes = [
      new NamedMorpheme(this.state),
      new PropertyMorpheme(this.state),
      new SubjectMorpheme(this.state),
      new DefineMorpheme(this.state),
      new SubstituteMorpheme(this.state),
      new IdentifierMorpheme(this.state)
    ];
  }

  public analyse(): Array<Token> {
    const { tokens } = this.state;
    const morphemeTokens: Array<MorphemeTokenBase> = [];
    let i = 0;
    while (i < tokens.length) {
      let result = null as MorphemeTokenBase | null;
      this.morphemes.find(morpheme => (result = morpheme.analyze(i)));
      if (result !== null) {
        morphemeTokens.push(result);
        i = result.tokenIndex.end;
      } else {
        i++;
      }
    }
    const resultTokens = tokens.slice();
    return morphemeTokens.reduceRight((prev, curr) => {
      prev.splice(
        curr.tokenIndex.start,
        curr.tokenIndex.end - curr.tokenIndex.start,
        curr as Token
      );
      return prev;
    }, resultTokens);
  }
}

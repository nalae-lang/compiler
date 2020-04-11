import { NalaeLexer } from "lexer/Lexer";
import { NalaeMorphemeAnalyzer } from "morpheme/Morpheme";
import { Token } from "token/interface";

export default class NalaeCompiler {
  private readonly lexer = new NalaeLexer();
  private readonly morpheme = new NalaeMorphemeAnalyzer([]);

  public compile(code: string): Array<Token> {
    const tokens = this.lexer.lex(code);
    this.morpheme.setTokens(tokens);
    return this.morpheme.analyze();
  }
}

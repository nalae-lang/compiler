import { NalaeLexer } from "lexer/Lexer";
import { NalaeMorphemeAnalyzer } from "morpheme/Morpheme";
import { Token } from "token/interface";

export default class NalaeCompiler {
  private readonly lexer = new NalaeLexer("");
  private readonly morpheme = new NalaeMorphemeAnalyzer([]);

  public compile(code: string): Array<Token> {
    this.lexer.setCode(code);
    const tokens = this.lexer.lex();
    this.morpheme.setTokens(tokens);
    const morphemeToken = this.morpheme.analyze();

    return morphemeToken;
  }
}
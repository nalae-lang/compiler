import { NalaeLexer } from "lexer/Lexer";
import { Token } from "token/interface";
import nalaeMorphemeAnalyze from "./morpheme/Morpheme";

export default class NalaeCompiler {
  private readonly lexer = new NalaeLexer();

  public compile(code: string): Array<Token> {
    const tokens = this.lexer.lex(code);
    return nalaeMorphemeAnalyze(tokens);
  }
}

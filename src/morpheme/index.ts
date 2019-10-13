import { TokenBase } from "token";
import { GrammerToken } from "lexer/lexers/GrammerLexer";

export abstract class MorphemeAnalyser<T extends TokenBase> {
  public abstract analyze(token: GrammerToken): T | null;
}

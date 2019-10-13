import { TokenBase } from "token";
import { GrammerToken } from "lexer/lexers/GrammerLexer";

export interface MorphemeAnalyser<T extends TokenBase> {
  analyze(token: GrammerToken): T | null;
}

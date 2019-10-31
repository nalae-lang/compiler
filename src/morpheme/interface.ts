import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { TokenBase } from "token/interface";

export interface MorphemeAnalyser<T extends TokenBase> {
  analyze(token: GrammerToken): T | null;
}

export type MorphemeList = [string, string];

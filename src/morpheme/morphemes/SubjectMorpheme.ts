import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

export interface SubjectToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.SUBJECT;
  readonly subject: ValueToken | null;
}

export class SubjectMorpheme extends MorphemeAnalyser<SubjectToken> {
  public analyze(index: number): SubjectToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.GRAMMER) {
      if (
        checkPostPosition(token.text, ["은", "는"]) !== false ||
        checkPostPosition(token.text, ["이", "가"]) !== false
      ) {
        return {
          type: MorphemeTokenTypes.SUBJECT,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          subject: {
            type: MorphemeTokenTypes.IDENTIFIER,
            index: {
              start: token.index.start,
              end: token.index.end - 1
            },
            tokenIndex: {
              start: index,
              end: index + 1
            },
            name: token.text.substr(0, token.text.length - 1)
          }
        };
      }
    }
    return null;
  }
}

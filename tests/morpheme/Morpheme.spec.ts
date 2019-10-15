import { NalaeLexer } from "lexer/Lexer";
import snapshot = require("snap-shot-it");
import { NalaeMorphemeAnalyser } from "morpheme/Morpheme";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

describe("Morpheme", () => {
  const morphemeAnalyser = new NalaeMorphemeAnalyser();
  it("주어 테스트", () => {
    const lexer = new NalaeLexer(`텍스트박스의 값은 "안녕하세요"이다`);
    const lexerResult = lexer.lex();
    snapshot("LEXER_RESULT_GRAMMER", lexerResult);
    expect(lexerResult.map(token => token.type)).to.deep.equal([
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.STRING,
      LexerTokenTypes.GRAMMER
    ]);

    const morphemeResult = morphemeAnalyser.analyse(lexerResult);
    snapshot("MORPHEME_RESULT_1", morphemeResult);
    expect(morphemeResult.map(token => token.type)).to.deep.equal([
      MorphemeTokenTypes.PROPERTY,
      MorphemeTokenTypes.SUBJECT,
      LexerTokenTypes.STRING,
      LexerTokenTypes.GRAMMER
    ]);
  });
});

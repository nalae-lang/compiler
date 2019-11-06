import { NalaeLexer } from "lexer/Lexer";
import { NalaeMorphemeAnalyzer } from "morpheme/Morpheme";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

describe("Morpheme", function() {
  it("주어 테스트", function() {
    const lexer = new NalaeLexer(`텍스트박스의 값은 "안녕하세요"이다.`);
    const lexerResult = lexer.lex();
    expect(lexerResult.map(token => token.type)).to.deep.equal([
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.STRING,
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.END
    ]);

    const morphemeAnalyser = new NalaeMorphemeAnalyzer(lexerResult);
    const morphemeResult = morphemeAnalyser.analyse();
    expect(morphemeResult.map(token => token.type)).to.deep.equal([
      MorphemeTokenTypes.PROPERTY,
      MorphemeTokenTypes.SUBJECT,
      MorphemeTokenTypes.DEFINE,
      LexerTokenTypes.END
    ]);
    snapshot("LEXER_RESULT_GRAMMER_1", lexerResult);
    snapshot("MORPHEME_RESULT_1", morphemeResult);
  });

  it("함수 테스트", function() {
    const lexer = new NalaeLexer(`콘솔은 "안녕하세요"를 출력한다.`);
    const lexerResult = lexer.lex();
    expect(lexerResult.map(token => token.type)).to.deep.equal([
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.STRING,
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.END
    ]);

    const morphemeAnalyser = new NalaeMorphemeAnalyzer(lexerResult);
    const morphemeResult = morphemeAnalyser.analyse();
    expect(morphemeResult.map(token => token.type)).to.deep.equal([
      MorphemeTokenTypes.SUBJECT,
      LexerTokenTypes.STRING,
      MorphemeTokenTypes.IDENTIFIER,
      MorphemeTokenTypes.IDENTIFIER,
      LexerTokenTypes.END
    ]);
    snapshot("LEXER_RESULT_GRAMMER_2", lexerResult);
    snapshot("MORPHEME_RESULT_2", morphemeResult);
  });

  it("틀 테스트", function() {
    const lexer = new NalaeLexer(`사람이라는 틀 생성.`);
    const lexerResult = lexer.lex();
    expect(lexerResult.map(token => token.type)).to.deep.equal([
      LexerTokenTypes.GRAMMER,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.END
    ]);

    const morphemeAnalyser = new NalaeMorphemeAnalyzer(lexerResult);
    const morphemeResult = morphemeAnalyser.analyse();
    expect(morphemeResult.map(token => token.type)).to.deep.equal([
      MorphemeTokenTypes.NAMED,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.END
    ]);
    snapshot("LEXER_RESULT_GRAMMER_3", lexerResult);
    snapshot("MORPHEME_RESULT_3", morphemeResult);
  });
});

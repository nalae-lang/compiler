import { NalaeLexer } from "lexer/Lexer";
import { NalaeMorphemeAnalyzer } from "morpheme/Morpheme";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { compareTokenList } from "../helper/lexer/CompareTokenList";
import snapshot = require("snap-shot-it");

describe("Morpheme", function () {
  const lexer = new NalaeLexer();
  it("주어 테스트", function () {
    const lexerResult = lexer.lex(`텍스트박스의 값은 "안녕하세요"이다.`);
    compareTokenList(lexerResult, [
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.STRING,
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.END,
    ]);

    const morphemeAnalyser = new NalaeMorphemeAnalyzer(lexerResult);
    const morphemeResult = morphemeAnalyser.analyze();
    compareTokenList(morphemeResult, [
      MorphemeTokenTypes.PROPERTY,
      MorphemeTokenTypes.SUBJECT,
      MorphemeTokenTypes.DEFINE,
      LexerTokenTypes.END,
    ]);
    snapshot(lexerResult);
    snapshot(morphemeResult);
  });

  it("함수 테스트", function () {
    const lexerResult = lexer.lex(`콘솔은 "안녕하세요"를 출력한다.`);
    compareTokenList(lexerResult, [
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.STRING,
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.END,
    ]);

    const morphemeAnalyser = new NalaeMorphemeAnalyzer(lexerResult);
    const morphemeResult = morphemeAnalyser.analyze();
    compareTokenList(morphemeResult, [
      MorphemeTokenTypes.SUBJECT,
      LexerTokenTypes.STRING,
      MorphemeTokenTypes.IDENTIFIER,
      MorphemeTokenTypes.IDENTIFIER,
      LexerTokenTypes.END,
    ]);
    snapshot(lexerResult);
    snapshot(morphemeResult);
  });

  it("함수 정의 테스트", function () {
    const lexerResult = lexer.lex(`콘솔은 ~를 출력한다를 정의하면,`);

    compareTokenList(lexerResult, [
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.OPERATOR,
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.OPERATOR,
    ]);

    const morphemeAnalyser = new NalaeMorphemeAnalyzer(lexerResult);
    const morphemeResult = morphemeAnalyser.analyze();

    compareTokenList(morphemeResult, [
      MorphemeTokenTypes.SUBJECT,
      MorphemeTokenTypes.ARGUMENT,
      MorphemeTokenTypes.IDENTIFIER,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.OPERATOR,
    ]);

    snapshot(lexerResult);
    snapshot(morphemeResult);
  });

  it("틀 테스트", function () {
    const lexerResult = lexer.lex(`사람이라는 틀 생성.`);
    compareTokenList(lexerResult, [
      LexerTokenTypes.GRAMMAR,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.END,
    ]);

    const morphemeAnalyser = new NalaeMorphemeAnalyzer(lexerResult);
    const morphemeResult = morphemeAnalyser.analyze();
    compareTokenList(morphemeResult, [
      MorphemeTokenTypes.NAMED,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.KEYWORD,
      LexerTokenTypes.END,
    ]);
    snapshot(lexerResult);
    snapshot(morphemeResult);
  });
});

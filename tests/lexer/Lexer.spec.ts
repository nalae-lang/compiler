import { LexerErrorCode } from "lexer/error/ErrorCode";
import { NalaeLexer } from "lexer/Lexer";
import snapshot from "snap-shot-it";
import { formatString } from "utils/FormatString";

describe("Lexer", function() {
  it("기본 문법 테스트", function() {
    const lexer = new NalaeLexer(
      `
"./web"에서 텍스트박스 불러오기.
텍스트박스의 값은 "안녕하세요"이다.
/*
  테스트 주석
*/
텍스트박스가 ~로 수정될 때를 정의하면,
  콘솔이 1번째 인자 + "로 수정됨"을 출력한다.`,
    );
    snapshot("LEXER_RESULT_DEFAULT", lexer.lex());
  });

  it("계산 식 테스트", function() {
    const lexer = new NalaeLexer(`콘솔이 3 + 2 - (5 * 3)를 출력`);
    snapshot("LEXER_RESULT_CALCULATE", lexer.lex());
  });

  it("setCode 테스트", function() {
    const lexer = new NalaeLexer(`사람이라는 틀 생성.`);
    snapshot("LEXER_RESULT_CREATE_CLASS_1", lexer.lex());
    lexer.setCode(`한국인이라는 틀 생성.`);
    snapshot("LEXER_RESULT_CREATE_CLASS_2", lexer.lex());
  });

  it("알 수 없는 문자", function() {
    const lexer = new NalaeLexer("알 수 없는 문자 &");
    expect(function() {
      lexer.lex();
    }).to.throw(formatString(LexerErrorCode.LEXER_UNKNOWN_WORD, ["&"]));
  });
});

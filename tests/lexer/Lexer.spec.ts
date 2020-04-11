import { LexerErrorCode } from "lexer/error/ErrorCode";
import { NalaeLexer } from "lexer/Lexer";
import snapshot from "snap-shot-it";
import { formatString } from "utils/FormatString";

describe("Lexer", function () {
  const lexer = new NalaeLexer();

  it("Lexer1", function () {
    snapshot(
      lexer.lex(`
"./web"에서 텍스트박스 불러오기.
텍스트박스의 값은 "안녕하세요"이다.
/*
  테스트 주석
*/
텍스트박스가 ~로 수정될 때를 정의하면,
  콘솔이 1번째 인자 + "로 수정됨"을 출력한다.`),
    );
  });

  it("계산 식 테스트", function () {
    snapshot(
      "LEXER_RESULT_CALCULATE",
      lexer.lex(`콘솔이 3 + 2 - (5 * 3)를 출력`),
    );
  });

  it("알 수 없는 문자", function () {
    expect(function () {
      lexer.lex("알 수 없는 문자 &");
    }).to.throw(formatString(LexerErrorCode.LEXER_UNKNOWN_WORD, ["&"]));
  });
});

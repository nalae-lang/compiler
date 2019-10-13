import { NalaeLexer } from "lexer/Lexer";
import snapshot from "snap-shot-it";
import { formatString } from "utils/FormatString";
import { ErrorCode } from "lexer/error/ErrorCode";

describe("Lexer", () => {
  it("test1", () => {
    const lexer = new NalaeLexer(
      `
"./web"에서 텍스트박스 불러오기.
텍스트박스의 값은 "안녕하세요"이다.
/*
  테스트 주석
*/
텍스트박스가 ~로 수정될 때를 정의하면,
  콘솔이 1번째 인자 + "로 수정됨"을 출력한다.`
    );
    snapshot(lexer.lex());
  });

  it("test2", () => {
    const lexer = new NalaeLexer(`콘솔이 3 + 2 - (5 * 3)를 출력`);
    snapshot(lexer.lex());
  });

  it("setCode 테스트", () => {
    const lexer = new NalaeLexer(`사람이라는 틀 생성.`);
    snapshot(lexer.lex());
    lexer.setCode(`한국인이라는 틀 생성.`);
    snapshot(lexer.lex());
  });

  it("알 수 없는 문자", () => {
    const lexer = new NalaeLexer("알 수 없는 문자 &");
    expect(() => {
      lexer.lex();
    }).to.throw(formatString(ErrorCode.LEXER_UNKNOWN_WORD, ["&"]));
  });
});

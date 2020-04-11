import { NalaeLexerError } from "../../../src/lexer/error";
import { LexerErrorCode } from "../../../src/lexer/error/ErrorCode";

describe("NalaeLexerError", function () {
  it("LexerError가 throw될 때", function () {
    expect(() => {
      throw new NalaeLexerError(LexerErrorCode.COMMENT_NOT_END, {
        start: 0,
        end: 1,
      });
    }).to.throw(LexerErrorCode.COMMENT_NOT_END);
  });

  it("LexerError name 비교", function () {
    const lexerError = new NalaeLexerError(LexerErrorCode.LEXER_LOOP, {
      start: 1,
      end: 2,
    });

    expect(lexerError.name).to.equal("NalaeLexerError");
    expect(lexerError.message).to.equal(LexerErrorCode.LEXER_LOOP);
    expect(lexerError.index).to.deep.equal({ start: 1, end: 2 });
  });
});

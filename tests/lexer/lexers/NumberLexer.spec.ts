import { LexerErrorCode } from "lexer/error/ErrorCode";
import { NumberLexer, Radix } from "lexer/lexers/NumberLexer";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { formatString } from "utils/FormatString";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";

function testValidNumber(
  code: string,
  expectNumber: number,
  radix: Radix
): () => void {
  return (): void => {
    const numberLexer = createLexer(NumberLexer, code);
    const result = numberLexer.parse(0);

    if (compareTokenType(result, LexerTokenTypes.NUMBER)) {
      expect(result.radix).to.equal(radix);
      expect(result.number).to.equal(expectNumber);
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    }
  };
}

describe("NumberLexer", () => {
  describe("매치 되는 경우", () => {
    it("2진수일 때", testValidNumber("0b1001", 0b1001, 2));

    it("음수인 2진수일 때", testValidNumber("-0b1001", -0b1001, 2));

    it("8진수일 때", testValidNumber("0o65", 0o65, 8));

    it("음수인 8진수일 때", testValidNumber("-0o65", -0o65, 8));

    it("o가 없는 8진수일 때", testValidNumber("065", 0o65, 8));

    it("o가 없는 음수인 8진수일 때", testValidNumber("-065", -0o65, 8));

    it("10진수일 때", testValidNumber("10", 10, 10));

    it("음수인 10진수일 때", testValidNumber("-10", -10, 10));

    it("10진수 실수형일 때", testValidNumber("10.132", 10.132, 10));

    it("음수인 10진수 실수형일 때", testValidNumber("-10.132", -10.132, 10));

    it("16진수일 때", testValidNumber("0x41FF", 0x41ff, 16));

    it("음수인 16진수일 때", testValidNumber("-0x41FF", -0x41ff, 16));

    it("0일 때", testValidNumber("0", 0, 10));
  });

  describe("매치 되지 않을 때", () => {
    it("8진수에서 16진수를 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "0o41FF");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(
        formatString(LexerErrorCode.NUMBER_BASE_NOT_MATCH, [8, "F"])
      );
    });

    it("2진수에서 16진수를 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "0b41FF");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(
        formatString(LexerErrorCode.NUMBER_BASE_NOT_MATCH, [2, "4"])
      );
    });

    it("8진수에서 10진수를 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "092");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(
        formatString(LexerErrorCode.NUMBER_BASE_NOT_MATCH, [8, 9])
      );
    });

    it("8진수에서 소수점을 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "015.32");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(
        formatString(LexerErrorCode.NUMBER_FLOAT_NOT_ALLOWED, [8])
      );
    });

    it("0x 만 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "0x");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(formatString(LexerErrorCode.NUMBER_UNKNOWN));
    });

    it("0z를 적었을 때", () => {
      const numberLexer = createLexer(NumberLexer, "0z");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.NUMBER)) {
        snapshot(result);
        expect(result.number).to.equal(0);
        expect(result.radix).to.equal(10);
        expect(result.index).to.deep.equal({ start: 0, end: 1 });
      }
    });

    it("숫자가 아닐 때", () => {
      const numberLexer = createLexer(NumberLexer, "text");
      const result = numberLexer.parse(0);

      expect(result).to.be.not.ok;
    });
  });
});

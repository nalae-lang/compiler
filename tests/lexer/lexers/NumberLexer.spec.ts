import { createLexer } from "../../helper/lexer/CreateLexer";
import { NumberLexer } from "lexer/lexers/NumberLexer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { TokenTypes } from "token";
import { ErrorCode } from "lexer/error/ErrorCode";
import { formatString } from "utils/FormatString";

describe("NumberLexer", () => {
  describe("매치 되는 경우", () => {
    it("2진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "0b1001");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(2);
        expect(result.number).to.be.equal(parseInt("1001", 2));
      }
    });

    it("음수인 2진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "-0b1001");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(2);
        expect(result.number).to.be.equal(parseInt("-1001", 2));
      }
    });

    it("8진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "0o65");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(8);
        expect(result.number).to.be.equal(0o65);
      }
    });

    it("음수인 8진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "-0o65");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(8);
        expect(result.number).to.be.equal(-0o65);
      }
    });

    it("o가 없는 8진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "065");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(8);
        expect(result.number).to.be.equal(0o65);
      }
    });

    it("o가 없는 음수인 8진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "-065");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(8);
        expect(result.number).to.be.equal(-0o65);
      }
    });

    it("10진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "10");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(10);
        expect(result.number).to.be.equal(10);
      }
    });

    it("음수인 10진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "-13");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(10);
        expect(result.number).to.be.equal(-13);
      }
    });

    it("10진수 실수형일 때", () => {
      const numberLexer = createLexer(NumberLexer, "10.132");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(10);
        expect(result.number).to.be.equal(10.132);
      }
    });

    it("음수인 10진수 실수형일 때", () => {
      const numberLexer = createLexer(NumberLexer, "-10.132");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(10);
        expect(result.number).to.be.equal(-10.132);
      }
    });

    it("16진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "0x41FF");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(16);
        expect(result.number).to.be.equal(0x41ff);
      }
    });

    it("음수인 16진수일 때", () => {
      const numberLexer = createLexer(NumberLexer, "-0x41FF");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(16);
        expect(result.number).to.be.equal(-0x41ff);
      }
    });

    it("0일 때", () => {
      const numberLexer = createLexer(NumberLexer, "0");
      const result = numberLexer.parse(0);

      if (compareTokenType(result, TokenTypes.NUMBER)) {
        expect(result.radix).to.be.equal(10);
        expect(result.number).to.be.equal(0);
      }
    });
  });

  describe("매치 되지 않을 때", () => {
    it("8진수에서 16진수를 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "0o41FF");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(formatString(ErrorCode.NUMBER_BASE_NOT_MATCH, [8, "F"]));
    });

    it("2진수에서 16진수를 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "0b41FF");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(formatString(ErrorCode.NUMBER_BASE_NOT_MATCH, [2, "4"]));
    });

    it("8진수에서 10진수를 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "092");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(formatString(ErrorCode.NUMBER_BASE_NOT_MATCH, [8, 9]));
    });

    it("8진수에서 소수점을 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "015.32");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(formatString(ErrorCode.NUMBER_FLOAT_NOT_ALLOWED, [8]));
    });

    it("0x 만 사용했을 때", () => {
      const numberLexer = createLexer(NumberLexer, "0x");

      expect(() => {
        numberLexer.parse(0);
      }).to.be.throw(formatString(ErrorCode.NUMBER_UNKNOWN));
    });

    it("숫자가 아닐 때", () => {
      const numberLexer = createLexer(NumberLexer, "text");
      const result = numberLexer.parse(0);

      expect(result).to.be.not.ok;
    });
  });
});

import { Token, TokenTypes } from "token";
import { Lexer } from "lexer";
import { NalaeLexerError } from "lexer/error";
import { ErrorCode } from "lexer/error/ErrorCode";

export type Radix = 2 | 8 | 10 | 16;
export interface NumberToken extends Token {
  type: TokenTypes.NUMBER;
  number: number;
  radix: Radix;
}

export class NumberLexer extends Lexer<NumberToken> {
  private checkNumber(index: number, radix: Radix): boolean {
    const { code } = this.state;
    const char = code[index].toLowerCase();
    if (radix <= 10) {
      return char >= "0" && char <= String(radix - 1);
    } else if (radix === 16) {
      return (char >= "0" && char <= "9") || (char >= "a" && char <= "f");
    }
    return false;
  }

  private parseNumber(
    index: number,
    startOfNumber: number,
    radix: Radix
  ): NumberToken {
    const { code, codeLength } = this.state;
    let i = index + startOfNumber;
    // 음수 체크변수
    let isNegative = false;
    // 음수 체크
    if (code[index - 1] === "-") {
      isNegative = true;
    }
    for (; i < codeLength; i++) {
      // 숫자가 맞을 때
      if (this.checkNumber(i, radix)) {
        continue;
      }
      // 자신의 진수가 아닌 값이 오면
      else if (this.checkNumber(i, 16)) {
        throw new NalaeLexerError(
          ErrorCode.NUMBER_BASE_NOT_MATCH,
          {
            start: i,
            end: i
          },
          [radix, code[i]]
        );
      }
      // 10진수가 아닌데 소수점이 있을 때
      else if (radix !== 10 && code[i] === "." && this.checkNumber(i + 1, 16)) {
        throw new NalaeLexerError(
          ErrorCode.NUMBER_FLOAT_NOT_ALLOWED,
          {
            start: i,
            end: i
          },
          [radix]
        );
      }
      const resultNumber =
        radix !== 10
          ? parseInt(
              (isNegative ? "-" : "") +
                code.substr(index + startOfNumber, i + 1),
              radix
            )
          : parseFloat(
              (isNegative ? "-" : "") +
                code.substr(index + startOfNumber, i + 1)
            );
      if (isNaN(resultNumber)) {
        throw new NalaeLexerError(ErrorCode.NUMBER_NUKNOWN, {
          start: index,
          end: i
        });
      }

      return {
        type: TokenTypes.NUMBER,
        index: {
          start: index,
          end: i - 1
        },
        radix,
        number: resultNumber
      };
    }
    throw new NalaeLexerError(ErrorCode.NUMBER_NOT_END, {
      start: index,
      end: i
    });
  }
  public parse(index: number): NumberToken | null {
    const { code } = this.state;
    let i = index;
    if (code[i] === "-" && this.checkNumber(i + 1, 10)) {
      i++;
    }
    if (code[i] === "0") {
      const numberType = code[i + 1].toLowerCase();
      // 16진수
      if (numberType === "x") {
        return this.parseNumber(i, 2, 16);
      }
      // 2진수
      else if (numberType === "b") {
        return this.parseNumber(i, 2, 2);
      }
      // 8진수
      else if (numberType === "o") {
        return this.parseNumber(i, 2, 8);
      }
      // 8진수에 o제외
      else if (numberType >= "0" && numberType < "8") {
        return this.parseNumber(i, 1, 8);
      }
      // 그냥 0일 때
      return {
        index: {
          start: i,
          end: i
        },
        number: 0,
        radix: 10,
        type: TokenTypes.NUMBER
      };
    } else if (code[i] >= "1" && code[i] <= "9") {
      return this.parseNumber(i, 0, 10);
    }
    return null;
  }
}

import { TokenBase } from "token";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { Lexer } from "lexer";
import { NalaeLexerError } from "lexer/error";
import { ErrorCode } from "lexer/error/ErrorCode";

export type Radix = 2 | 8 | 10 | 16;
export interface NumberToken extends TokenBase {
  type: LexerTokenTypes.NUMBER;
  number: number;
  radix: Radix;
}

export class NumberLexer extends Lexer<NumberToken> {
  public static readonly TOKEN_TYPE = LexerTokenTypes.NUMBER;

  private checkNumber(index: number, radix: Radix): boolean {
    const { code } = this.state;
    if (code[index] === undefined) {
      return false;
    }
    const char = code[index].toLowerCase();
    if (radix <= 10) {
      return char >= "0" && char <= String(radix - 1);
    }
    return (char >= "0" && char <= "9") || (char >= "a" && char <= "f");
  }

  private parseNumber(
    index: number,
    startOfNumber: number,
    radix: Radix
  ): NumberToken {
    const { code } = this.state;
    let i = index + startOfNumber;
    // 음수 체크변수
    let isNegative = false;
    // 음수 체크
    if (code[index - 1] === "-") {
      isNegative = true;
    }
    for (; i < code.length + 1; i++) {
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
            end: i + 1
          },
          [radix, code[i]]
        );
      }
      // 소수점이 있을 때
      else if (code[i] === "." && this.checkNumber(i + 1, 16)) {
        if (radix === 10) {
          continue;
        }
        // 10진수가 아니면
        throw new NalaeLexerError(
          ErrorCode.NUMBER_FLOAT_NOT_ALLOWED,
          {
            start: i,
            end: i + 1
          },
          [radix]
        );
      }
      break;
    }
    const resultNumber =
      radix !== 10
        ? parseInt(
            (isNegative ? "-" : "") + code.substr(index + startOfNumber, i + 1),
            radix
          )
        : parseFloat(
            (isNegative ? "-" : "") + code.substr(index + startOfNumber, i + 1)
          );
    if (isNaN(resultNumber)) {
      throw new NalaeLexerError(ErrorCode.NUMBER_UNKNOWN, {
        start: index,
        end: i + 1
      });
    }

    return {
      type: LexerTokenTypes.NUMBER,
      index: {
        start: index - (isNegative ? 1 : 0),
        end: i
      },
      radix,
      number: resultNumber
    };
  }
  public parse(index: number): NumberToken | null {
    const { code } = this.state;
    let i = index;
    if (code[i] === "-" && this.checkNumber(i + 1, 10)) {
      i++;
    }
    if (code[i] === "0") {
      const numberType = code[i + 1] && code[i + 1].toLowerCase();
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
      else if (numberType >= "0" && numberType <= "9") {
        return this.parseNumber(i, 1, 8);
      }
      // 그냥 0일 때
      return {
        index: {
          start: i,
          end: i + 1
        },
        number: 0,
        radix: 10,
        type: LexerTokenTypes.NUMBER
      };
    } else if (code[i] >= "1" && code[i] <= "9") {
      return this.parseNumber(i, 0, 10);
    }
    return null;
  }
}

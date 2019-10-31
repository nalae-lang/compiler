import { NalaeLexerError } from "lexer/error";
import { LexerErrorCode } from "lexer/error/ErrorCode";
import { Lexer } from "lexer/interface";
import { TokenBase } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export type Radix = 2 | 8 | 10 | 16;
export interface NumberToken extends TokenBase {
  readonly type: LexerTokenTypes.NUMBER;
  readonly number: number;
  readonly radix: Radix;
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
      if (this.checkNumber(i, radix)) {
        // 숫자가 맞을 때
        continue;
      } else if (this.checkNumber(i, 16)) {
        // 자신의 진수가 아닌 값이 오면
        throw new NalaeLexerError(
          LexerErrorCode.NUMBER_BASE_NOT_MATCH,
          {
            start: i,
            end: i + 1
          },
          [radix, code[i]]
        );
      } else if (code[i] === "." && this.checkNumber(i + 1, 16)) {
        // 소수점이 있을 때
        if (radix === 10) {
          continue;
        }
        // 10진수가 아니면
        throw new NalaeLexerError(
          LexerErrorCode.NUMBER_FLOAT_NOT_ALLOWED,
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
      throw new NalaeLexerError(LexerErrorCode.NUMBER_UNKNOWN, {
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
      if (code[i + 1] !== undefined) {
        const numberType = code[i + 1].toLowerCase();
        if (numberType === "x") {
          // 16진수
          return this.parseNumber(i, 2, 16);
        } else if (numberType === "b") {
          // 2진수
          return this.parseNumber(i, 2, 2);
        } else if (numberType === "o") {
          // 8진수
          return this.parseNumber(i, 2, 8);
        } else if (numberType >= "0" && numberType <= "9") {
          // 8진수에 o제외
          return this.parseNumber(i, 1, 8);
        }
      }

      // 그냥 0이거나 진수 문자가 없을 때
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

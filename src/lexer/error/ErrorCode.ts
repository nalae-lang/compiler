export enum ErrorCode {
  // 알 수 없는 Lexer 에러
  LEXER_LOOP = "구문 해석기에 알 수 없는 오류가 났습니다. code[%s] (%s)",

  // 주석 오류
  COMMENT_NOT_END = "주석이 끝나지 않았습니다.",

  // 숫자 오류
  NUMBER_UNKNOWN = "숫자 해석 오류",
  NUMBER_BASE_NOT_MATCH = "숫자 진수 오류. %s진수에는 '%s'를 사용하지 못합니다.",
  NUMBER_FLOAT_NOT_ALLOWED = "%s진수에서는 소수점(.)을 사용하지 못합니다.",

  // RawCode 오류
  RAWCODE_NOT_END = "코드가 끝나지 않았습니다.",

  // 문자열 오류
  STRING_NOT_END = "문자열이 끝나지 않았습니다."
}

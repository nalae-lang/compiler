export enum ErrorCode {
  // 주석 오류
  COMMENT_NOT_END = "주석이 끝나지 않았습니다.",

  // 숫자 오류
  NUMBER_NUKNOWN = "숫자 해석 오류",
  NUMBER_NOT_END = "숫자가 끝나지 않았습니다.",
  NUMBER_BASE_NOT_MATCH = "숫자 진수 오류. %s진수에는 '%s'를 사용하지 못합니다.",
  NUMBER_FLOAT_NOT_ALLOWED = "%s진수에서는 소수점(.)을 사용하지 못합니다."
}

export enum ASTParserErrorCode {
  EXPRESSION_NEED = "연산자 다음에는 수식이 필요합니다.",

  FUNCTION_DEFINE_SUBJECT_NEED = "함수 정의는 주어가 필요합니다.",
  FUNCTION_DEFINE_UNKNOWN_TOKEN = "함수 정의에는 인자값만 올 수 있습니다.",
  FUNCTION_DEFINE_COMMA_NOT_EXISTS = "함수 정의 뒤에는 쉼표(,)가 필요합니다.",
  FUNCTION_DEFINE_NAME_NOT_EXISTS = "함수 이름이 필요합니다.",
  FUNCTION_DEFINE_NAME_NOT_FORMATTED = "함수 이름뒤에 을/를이 필요합니다.",
}

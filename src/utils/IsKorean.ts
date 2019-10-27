/**
 * 문자가 한국어인지 확인합니다.
 * @param string 문자열
 * @param index 찾을 인덱스
 */
export function isKorean(string: string): boolean {
  const charCode = string.charCodeAt(0);

  return charCode >= 0xac00 && charCode <= 0xd7a3;
}

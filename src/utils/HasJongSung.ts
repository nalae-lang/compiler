/**
 * 문자가 종성을 가지고 있는지 확인합니다.
 * @param string 문자열
 * @param index 찾을 인덱스
 */
export function hasJongSung(string: string): boolean {
  const charCode = string.charCodeAt(0);

  return (charCode - 0xac00) % 28 > 0;
}

import { isKorean } from "./IsKorean";
import { hasJongSung } from "./HasJongSung";

function comparePostPosition(
  word: string,
  josa: string,
  needJongSung: boolean,
  executeSecond?: () => ReturnType<typeof comparePostPosition>
): 1 | 0 | false {
  const matchIndex = executeSecond !== undefined ? 0 : 1;
  if (word.endsWith(josa)) {
    const char = word.charAt(word.length - josa.length - 1);

    if (isKorean(char)) {
      if (needJongSung) {
        if (hasJongSung(char)) {
          return matchIndex;
        }
        return false;
      }

      if (!hasJongSung(char)) {
        return matchIndex;
      }
      return false;
    }
    return matchIndex;
  }
  if (executeSecond !== undefined) {
    return executeSecond();
  }
  return false;
}

/**
 * 마지막 글자의 받침과 함께 조사를 검사합니다.
 * @param word 조사를 포함한 단어
 * @param josa [받침이 있을 때 단어, 받침이 없을 때 단어] 순서
 */
export function checkPostPosition(
  word: string,
  josa: [string, string]
): 0 | 1 | false {
  // 길이가 긴 조사부터 단어를 비교해야 함.
  if (josa[0].length < josa[1].length) {
    return comparePostPosition(word, josa[1], false, () =>
      comparePostPosition(word, josa[0], true)
    );
  }
  return comparePostPosition(word, josa[0], true, () =>
    comparePostPosition(word, josa[1], false)
  );
}

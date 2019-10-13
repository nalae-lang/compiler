function comparePostPosition(
  word: string,
  josa: string,
  needJongSong: boolean,
  executeSecond?: () => boolean
): boolean {
  if (word.endsWith(josa)) {
    const unicode = word.charCodeAt(word.length - josa.length - 1);

    if (unicode >= 0xac00 && unicode <= 0xd7a3) {
      if (needJongSong) {
        return (unicode - 0xac00) % 28 > 0;
      }
      return (unicode - 0xac00) % 28 <= 0;
    }
    return true;
  }
  return !!executeSecond && executeSecond();
}

/**
 * 마지막 글자의 받침과 함께 조사를 검사합니다.
 * @param word 조사를 포함한 단어
 * @param josa [받침이 있을 때 단어, 받침이 없을 때 단어] 순서
 */
export function checkPostPosition(
  word: string,
  josa: [string, string]
): boolean {
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

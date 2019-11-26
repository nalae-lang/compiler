export function formatString(
  string: string,
  parameter?: ReadonlyArray<string | number>
): string {
  let i = 0;
  return parameter !== undefined
    ? string.replace(/%s/g, () => "" + parameter[i++])
    : string;
}

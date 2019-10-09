export function formatString(
  string: string,
  parameter?: Array<string | number>
): string {
  let i = 0;
  return parameter ? string.replace(/%s/g, () => "" + parameter[i++]) : string;
}

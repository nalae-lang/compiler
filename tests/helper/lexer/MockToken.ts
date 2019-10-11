import { Token } from "token";

export function mockToken<T extends Token>(
  tokenType: Token["type"],
  options: Omit<T, keyof Token>
): T {
  return {
    type: tokenType,
    index: {
      start: 0,
      end: 1
    },
    ...options
  } as T;
}

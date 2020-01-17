import { messages } from "./messages";
import { LocalesEnum } from "../locales.enum";

test('has object entries for all locales', () => {
  const value = Object.fromEntries(Object.entries(messages).map(entry => [entry[0], typeof entry[1]]));
  const expectedValue: Record<LocalesEnum, "object"> = {
    [LocalesEnum.en]: "object",
    [LocalesEnum.pl]: "object",
  };

  expect(value).toEqual(expectedValue);
});
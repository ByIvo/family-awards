
import { parseMessagesFromFile } from "../../src/core/parser";
import { Messages } from "../../src/core/types";
import { StickerCount } from "../../src/processors/sticker-count.processor";

describe("Sticker Count", () => {
  it('should count the sticker sents', () => {
    const messages = parseMessagesFromFile("tests/sticker-count/sticker-count-test-input.txt");
    const result = StickerCount.run(messages);
    expect(result.results).toEqual({
      "Antonio Tio": 2,
      "Tia Nete": 1
    });
  });
});
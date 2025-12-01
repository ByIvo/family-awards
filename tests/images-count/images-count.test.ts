
import { parseMessagesFromFile } from "../../src/core/parser";
import { Messages } from "../../src/core/types";
import { ImagesCount } from "../../src/processors/images-count.processor";

describe("Images Count", () => {
  it('should count the images sents', () => {
    const messages = parseMessagesFromFile("tests/images-count/images-count-test-input.txt");
    const result = ImagesCount.run(messages);
    expect(result.results).toEqual({
      "Antonio Tio": 2,
      "Tia Nete": 1
    });
  });
});
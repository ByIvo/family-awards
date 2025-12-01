
import { parseMessagesFromFile } from "../../src/core/parser";
import { Messages } from "../../src/core/types";
import { MoreMessagesSentProcessor } from "../../src/processors/more-messages-sent.processor";

describe("More Messages Sent", () => {
  it('should count the amount of messages sent', () => {
    const messages = parseMessagesFromFile("tests/more-messages-sent/more-messages-sent-test-input.txt");
    const result = MoreMessagesSentProcessor.run(messages);
    expect(result.results).toEqual({
      "Gueto": 4,
      "Tia Nete": 2,
      "Madrinha": 2,
      "Pai - Novo": 1,
      "Lucia": 1
    });
  });
});
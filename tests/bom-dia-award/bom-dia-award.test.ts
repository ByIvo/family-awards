import { parseMessagesFromFile } from "../../src/core/parser";
import { Messages } from "../../src/core/types";
import { BomDiaProcessor } from "./../../src/processors/bom-dia.processor";

describe("Bom dia Award", () => {
  let messages: Messages;

  beforeEach(() => {
    messages = parseMessagesFromFile("tests/bom-dia-award/bom-dia-award-test-input.txt");
  });

  it('should result not processed messages as remanescent', () => {
    const result = BomDiaProcessor.run(messages);
    expect(result.remanescent).toEqual([{
      "author": "Tia Nete",
      "datetime": new Date("2025-11-27T07:02:22.000-03:00"),
      "message": "Nada de mais",
    }]);
  });

  it('should process bom dia messages', () => {
    const result = BomDiaProcessor.run(messages);
    expect(result.results).toEqual({
      "Gueto": 2
    });
  });
});
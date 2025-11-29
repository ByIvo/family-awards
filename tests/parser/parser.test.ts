import { parseMessagesFromFile } from "../../src/core/parser";
import { serializeMessagesToFile } from "../../src/core/serializer";
import * as fs from "fs";

describe("Parser", () => {

  describe("individual messages in the file", () => {
    it("should parse simple text message", () => {
      const messages = parseMessagesFromFile("./tests/parser/parser-test-input.txt");

      expect(messages).toContainEqual({
        datetime: new Date("2022-12-21T08:24:08-03:00"),
        author: "Madrinha",
        message: "Bom dia"
      });
    });

    it("should parse large text messages", () => {
      const messages = parseMessagesFromFile("./tests/parser/parser-test-input.txt");

      expect(messages).toContainEqual({
        datetime: new Date("2035-11-29T10:59:59-03:00"),
        author: "Someone else",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ultricies leo, quis finibus eros. Aliquam malesuada maximus lorem et dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dapibus lorem dolor, sit amet sollicitudin enim tempor id. Nullam fringilla tincidunt elit sit amet vestibulum. Nunc pulvinar diam neque, a cursus sapien rhoncus eget. Integer sed nisi non massa blandit auctor a non metus."
      });
    });

    it("should keep emojis", () => {
      const messages = parseMessagesFromFile("./tests/parser/parser-test-input.txt");

      expect(messages).toContainEqual({
        datetime: new Date("2025-11-27T10:32:22-03:00"),
        author: "Lucia",
        message: "Bom dia 🥰🥰"
      });
    });
  });

  describe("round-trip parsing", () => {
    it("should be able to reconstruct the file from parsed content", () => {
    const inputPath = "./tests/parser/parser-test-input.txt";
    const original = fs.readFileSync(inputPath, "utf8").trimEnd();

    const messages = parseMessagesFromFile(inputPath);
    const rebuilt = serializeMessagesToFile(messages).trimEnd();

    expect(rebuilt).toBe(original);
    });
  });
});
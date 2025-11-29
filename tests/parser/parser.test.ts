import { parseMessagesFromFile } from "../../src/core/parser";

describe("Parser test", () => {

    it("should parse the messages in a file", () => {
        const messages = parseMessagesFromFile("./tests/parser/parser-test-input.txt"); 

        expect(messages).toContainEqual({
            datetime: new Date("2022-12-21T08:24:08-03:00"),
            author: "Madrinha",
            message: "Bom dia"
        });
    });
});
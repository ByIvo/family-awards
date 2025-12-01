
import { parseMessagesFromFile } from "../../src/core/parser";
import { CongratulationsCount } from "../../src/processors/congratulations-count.processor";

describe("Congratulations Count", () => {

it('should result not processed messages as remanescent', () => {
  const messages = parseMessagesFromFile("tests/congratulations-count/congratulations-count-test-input.txt");
    const result = CongratulationsCount.run(messages);

    expect(result.remanescent).toEqual([{
      "author": "Ivone",
      "datetime": new Date("2025-02-09T08:50:47.000-03:00"),
      "message": "Bom dia 🌹",
    },
    {
      "author": "Ione",
      "datetime": new Date("2025-03-08T07:20:15.000-03:00"),
      "message": "Parabéns pra nós 👏👏👏👏",
    },
    {
      "author": "Ione",
      "datetime": new Date("2025-03-08T07:20:15.000-03:00"),
      "message": "Parabéns e feliz dia das mães a todas vçs da família Deus abençoe sempre...🫂",
    },
    {
      "author": "Ione",
      "datetime": new Date("2025-03-08T07:20:15.000-03:00"),
      "message": "Parabéns a todos os trabalhadores",
    }
  ]);
  });

  it('should count the congratulations sents', () => {
    const messages = parseMessagesFromFile("tests/congratulations-count/congratulations-count-test-input.txt");

    const result = CongratulationsCount.run(messages);
    expect(result.results).toEqual({
      "Pai - Novo": 1,
      "Edna": 1,
      "Antonio Tio": 1,
      "Tio Jonas": 2,
      "Madrinha": 1,
      "Gueto": 1,
      "Ivone": 1
    });
  });
});
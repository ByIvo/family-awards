import { Message, Messages, Processor, ProcessorResult } from "../core/types";

export const CongratulationsCount: Processor = {
  name: "congratulations-count",

  run(messages: Messages): ProcessorResult {
    
    const regexes = [
      /parab[ée]ns/iu,
      /feliz\s+anivers[áa]rio/iu,
    ];

    const results: Record<string, number> = {};
    const remanescent: Messages = [];
    const processed: Messages = [];

    for (const m of messages) {
      const t = m.message ?? "";
      const isCongratulation = regexes.some(r => r.test(t));
      if (isCongratulation && !isHoliday(m)) {
        results[m.author] = (results[m.author] || 0) + 1;
        processed.push(m);
      } else {
        remanescent.push(m);
      }
    }

    return {
      remanescent, results, processed
    };

    function isHoliday(message: Message) {
      const holidayRegexes = [
        /m[ãa]es/iu,
        /trabalhadores/iu,
        /parabéns pra nós/iu,
      ];
      return holidayRegexes.some(r => r.test(message.message ?? ""));
    }
  }
}
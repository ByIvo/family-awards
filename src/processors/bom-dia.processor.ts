import { Messages } from "../core/types";
import { ProcessorResult } from "./types";

export const BomDiaProcessor = {
  name: "bom-dia",

  run(messages: Messages): ProcessorResult {
    
    const regexes = [
      /\bb+o+m+[\s-]+d+i+a+\b/iu,
      /^d+i+a+$/iu,
      /\bbom\s+giorno+\b/iu,
      /^bom di\w$/iu,
      /bo.\s?dia/iu,
      /bim dia+$/iu,
    ];

    const results: Record<string, number> = {};
    const remanescent: Messages = [];
    const processed: Messages = [];

    for (const m of messages) {
      const t = m.message ?? "";
      const ok = regexes.some(r => r.test(t));
      if (ok) {
        results[m.author] = (results[m.author] || 0) + 1;
        processed.push(m);
      } else {
        remanescent.push(m);
      }
    }

    return {
      remanescent, results, processed
    };
  }
}
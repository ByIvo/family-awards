import { Messages } from "../core/types";
import { ProcessorResult } from "./types";

export const BomDiaProcessor = {
  name: "bom-dia",

  run(messages: Messages): ProcessorResult {
    
    const regexes = [
      /\bbom\s+dia+\b/iu
    ];

    const results: Record<string, number> = {};
    const remanescent: Messages = [];

    for (const m of messages) {
      const t = m.message ?? "";
      const ok = regexes.some(r => r.test(t));
      if (ok) {
        results[m.author] = (results[m.author] || 0) + 1;
      } else {
        remanescent.push(m);
      }
    }

    return {
      remanescent, results
    };
  }
}
import { Messages, ProcessorResult } from "../core/types";


export const MoreMessagesSentProcessor = {
    name: "more-messages-sent",
    run(messages: Messages): ProcessorResult {
        const results: Record<string, number> = {};
       
        const processed = [] as Messages;

        for (const m of messages) {
            results[m.author] = (results[m.author] || 0) + 1;
            processed.push(m);
        }

         const remanescent = [] as Messages;
        return {
            remanescent ,results, processed
        };
    }
};
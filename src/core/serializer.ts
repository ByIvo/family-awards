import { Messages } from "./types";

export function serializeMessagesToFile(messages: Messages): string {
      const lines: string[] = [];

      for (const m of messages) {
        const dt = m.datetime;
        const prefix = dt
          ? `[${formatDate(dt)}, ${formatTime(dt)}] `
          : "";

        const author = m.author ?? "unknown";

        const msgLines = m.message.split(/\n/);

        // first line
        lines.push(`${prefix}${author}: ${msgLines[0]}`);

        // continuation lines
        for (let i = 1; i < msgLines.length; i++) {
          lines.push(msgLines[i]);
        }
      }

      return lines.join("\n");
    }

    function pad(n: number, size = 2) {
      return String(n).padStart(size, "0");
    }

    function formatDate(dt: Date): string {
      const dd = pad(dt.getDate());
      const mm = pad(dt.getMonth() + 1);
      const yyyy = dt.getFullYear();
      return `${dd}/${mm}/${yyyy.toString().slice(-2)}`;
    }

    function formatTime(dt: Date): string {
      const hh = pad(dt.getHours());
      const mm = pad(dt.getMinutes());
      const ss = pad(dt.getSeconds());
      return `${hh}:${mm}:${ss}`;
    }
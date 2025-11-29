import * as fs from "fs";
import { Messages, Message } from "./types";

// TODO Handle not existing files
// TODO Handle invalid lines

export function parseMessagesFromFile(filePath: string): Messages {
    const raw = fs.readFileSync(filePath, "utf8");
    const lines = raw.split(/\r?\n/);

    const messages: Message[] = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Esperado: [21/12/22, 08:24:08] Madrinha: Bom dia
        if (!trimmed.startsWith("[")) {
            // ignorar (não é uma linha com timestamp)
            continue;
        }

        const closingBracketIdx = trimmed.indexOf("]");
        if (closingBracketIdx === -1) continue; // formato inválido, ignora

        // conteúdo dentro dos colchetes
        const inside = trimmed.slice(1, closingBracketIdx);  // "21/12/22, 08:24:08"

        // split date e time
        const commaIdx = inside.indexOf(",");
        if (commaIdx === -1) continue;

        const dateStr = inside.slice(0, commaIdx).trim();    // "21/12/22"
        const timeStr = inside.slice(commaIdx + 1).trim();   // "08:24:08"

        const datetime = parseDateTime(dateStr, timeStr);

        // agora pegar o resto:
        // "Madrinha: Bom dia"
        const rest = trimmed.slice(closingBracketIdx + 1).trim();

        const colonIdx = rest.indexOf(":");
        if (colonIdx === -1) continue;

        const author = rest.slice(0, colonIdx).trim();
        const message = rest.slice(colonIdx + 1).trim();

        messages.push({
            datetime,
            author,
            message
        });
    }

    return messages;
}

/** Converte dd/mm/yy + hh:mm:ss para um Date real com UTC-3 */
function parseDateTime(dateStr: string, timeStr: string): Date {
    const [dd, mm, yyRaw] = dateStr.split("/");

    const yyyy = yyRaw.length === 2 ? `20${yyRaw}` : yyRaw;

    const timeParts = timeStr.split(":");

    const [hh, min, ss = "00"] = timeParts;

    // Monta ISO com offset -03:00
    const iso = `${yyyy}-${mm.padStart(2,"0")}-${dd.padStart(2,"0")}T${hh.padStart(2,"0")}:${min.padStart(2,"0")}:${ss.padStart(2,"0")}-03:00`;

    return new Date(iso);
}

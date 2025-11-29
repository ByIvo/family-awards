import * as fs from "fs/promises";
import * as path from "path";
import { parseMessagesFromFile } from "./core/parser";
import { serializeMessagesToFile } from "./core/serializer";
import { BomDiaProcessor } from "./processors/bom-dia.processor";
import { Messages } from "./core/types";

async function main() {
  const inputFile = getInputFile();
  const messages = parseMessagesFromFile(inputFile);
  const processorResult = BomDiaProcessor.run(messages);

  const dirPath = await ensureProcessorOutputDir("bom-dia");
  await writeResultsJson(dirPath, processorResult.results);
  await writeTxt(dirPath, 'remanescent', processorResult.remanescent);
  await writeTxt(dirPath, 'processed', processorResult.processed);

  console.log("Done.");
}

function getInputFile(): string {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node dist/entrypoint.js <chat.txt>");
    process.exit(1);
  }
  return file;
}

async function ensureProcessorOutputDir(processorName: string): Promise<string> {
  const dir = path.join("results", processorName);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

async function writeResultsJson(dir: string, results: any) {
  const file = path.join(dir, "results.json");
  await fs.writeFile(file, JSON.stringify(results, null, 2), "utf8");
}

async function writeTxt(dir: string, name: string, remaining: Messages) {
  const text = serializeMessagesToFile(remaining);
  const file = path.join(dir, `${name}.txt`);
  await fs.writeFile(file, text, "utf8");
}

main();

import { parseMessagesFromFile } from "./core/parser";
import { BomDiaProcessor } from "./processors/bom-dia.processor";

const inputFile = process.argv[2];

const messages = parseMessagesFromFile(inputFile);

const processorResult = BomDiaProcessor.run(messages);
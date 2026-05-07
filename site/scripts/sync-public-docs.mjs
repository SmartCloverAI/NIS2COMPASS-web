import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "../../docs");
const target = resolve(here, "../public/artifacts/docs");
const legacyTarget = resolve(here, "../public/docs");

await rm(target, { recursive: true, force: true });
await rm(legacyTarget, { recursive: true, force: true });
await mkdir(dirname(target), { recursive: true });
await cp(source, target, { recursive: true });

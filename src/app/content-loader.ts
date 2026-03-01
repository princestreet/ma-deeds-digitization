import * as fs from "fs";
import * as path from "path";

export function readContent(filename: string): string {
  const filePath = path.join(process.cwd(), "src/content", filename);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return `*Content file ${filename} not found.*`;
  }
}

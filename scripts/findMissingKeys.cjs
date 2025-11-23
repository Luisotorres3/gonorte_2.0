const fs = require("fs");
const path = require("path");
const ts = require("typescript");

function gatherFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      files.push(...gatherFiles(fullPath));
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

function collectKeys(files) {
  const keys = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const source = ts.createSourceFile(
      file,
      content,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    );

    function visit(node) {
      if (ts.isCallExpression(node)) {
        let isTranslationCall = false;
        if (
          ts.isIdentifier(node.expression) &&
          node.expression.escapedText === "t"
        ) {
          isTranslationCall = true;
        }
        if (
          ts.isPropertyAccessExpression(node.expression) &&
          node.expression.name &&
          node.expression.name.escapedText === "t"
        ) {
          isTranslationCall = true;
        }

        if (isTranslationCall && node.arguments.length >= 1) {
          const keyNode = node.arguments[0];
          if (keyNode && ts.isStringLiteralLike(keyNode)) {
            keys.add(keyNode.text);
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(source);
  }
  return keys;
}

function main() {
  const root = process.cwd();
  const srcDir = path.join(root, "src");
  const files = gatherFiles(srcDir);
  const keys = collectKeys(files);

  const enLocalePath = path.join(root, "public", "locales", "en.json");
  const en = JSON.parse(fs.readFileSync(enLocalePath, "utf8"));

  const missing = Array.from(keys)
    .filter((key) => en[key] === undefined)
    .sort();

  fs.writeFileSync(
    path.join(root, "missing-keys.json"),
    JSON.stringify(missing, null, 2)
  );

  console.log(`Total keys found: ${keys.size}`);
  console.log(`Missing keys written to missing-keys.json: ${missing.length}`);
}

main();

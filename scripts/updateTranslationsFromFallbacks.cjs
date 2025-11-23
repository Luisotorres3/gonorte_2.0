const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const LOCALES = ["en", "es", "fr"];

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

function collectFallbacks(files) {
  const fallbacks = new Map();

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
          const defaultNode = node.arguments[1];

          if (keyNode && ts.isStringLiteralLike(keyNode)) {
            const key = keyNode.text;
            if (
              !fallbacks.has(key) &&
              defaultNode &&
              ts.isStringLiteralLike(defaultNode)
            ) {
              fallbacks.set(key, defaultNode.text);
            }
          }
        }
      }

      ts.forEachChild(node, visit);
    }

    visit(source);
  }

  return fallbacks;
}

function updateLocales(fallbacks) {
  const root = process.cwd();
  for (const localeName of LOCALES) {
    const localePath = path.join(
      root,
      "public",
      "locales",
      `${localeName}.json`
    );
    if (!fs.existsSync(localePath)) {
      console.warn(`Locale file not found: ${localePath}`);
      continue;
    }

    const locale = JSON.parse(fs.readFileSync(localePath, "utf8"));
    let added = 0;

    for (const [key, fallback] of fallbacks.entries()) {
      if (locale[key] === undefined && fallback !== undefined) {
        locale[key] = fallback;
        added += 1;
      }
    }

    if (added > 0) {
      fs.writeFileSync(localePath, JSON.stringify(locale, null, 2) + "\n");
      console.log(`Added ${added} keys to ${localeName}.json`);
    } else {
      console.log(`No new keys added to ${localeName}.json`);
    }
  }
}

function main() {
  const root = process.cwd();
  const files = gatherFiles(path.join(root, "src"));
  const fallbacks = collectFallbacks(files);

  fs.writeFileSync(
    path.join(root, "fallback-values.json"),
    JSON.stringify(Object.fromEntries(fallbacks), null, 2)
  );

  updateLocales(fallbacks);
}

main();

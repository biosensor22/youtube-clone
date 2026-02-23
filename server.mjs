import { createServer } from "node:http";
import { existsSync, readFileSync, watch, writeFileSync } from "node:fs";
import { createServer as createNetServer } from "node:net";
import { extname } from "node:path";
import { parse } from "node:url";

import JSON5 from "json5";
import { Low } from "lowdb";
import { DataFile, JSONFile } from "lowdb/node";
import next from "next";

import { createApp as createJsonServerApp } from "json-server/lib/app.js";
import { Observer } from "json-server/lib/observer.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST ?? "0.0.0.0";
const hasExplicitPort = Boolean(process.env.PORT);
const defaultPort = Number(process.env.PORT ?? 3000);
const dbFile = process.env.JSON_DB_FILE ?? "db.json5";

async function findAvailablePort(startPort, host, maxAttempts = 20) {
  let candidate = startPort;

  for (let i = 0; i < maxAttempts; i += 1) {
    const isFree = await new Promise((resolve) => {
      const probe = createNetServer();

      probe.once("error", (error) => {
        if (error?.code === "EADDRINUSE" || error?.code === "EACCES") {
          resolve(false);
          return;
        }

        throw error;
      });

      probe.once("listening", () => {
        probe.close(() => resolve(true));
      });

      probe.listen(candidate, host);
    });

    if (isFree) return candidate;
    candidate += 1;
  }

  throw new Error(
    `No free port found starting from ${startPort} after ${maxAttempts} attempts`
  );
}

if (!existsSync(dbFile)) {
  throw new Error(`DB file not found: ${dbFile}`);
}

if (readFileSync(dbFile, "utf8").trim() === "") {
  writeFileSync(dbFile, "{}");
}

const adapter =
  extname(dbFile) === ".json5"
    ? new DataFile(dbFile, {
        parse: JSON5.parse,
        stringify: JSON5.stringify,
      })
    : new JSONFile(dbFile);

const observer = new Observer(adapter);
const db = new Low(observer, {});
await db.read();

if (dev) {
  watch(dbFile, { persistent: false }, () => {
    db.read().catch((error) => {
      console.error(`Failed to reload ${dbFile}`, error);
    });
  });
}

const jsonServerApp = createJsonServerApp(db, { logger: false });
const port =
  dev && !hasExplicitPort
    ? await findAvailablePort(defaultPort, hostname)
    : defaultPort;
const browserHost = hostname === "0.0.0.0" ? "localhost" : hostname;
const nextApp = next({ dev, hostname, port });
const nextHandler = nextApp.getRequestHandler();

await nextApp.prepare();

if (dev && port !== defaultPort) {
  console.warn(
    `Port ${defaultPort} is busy. Starting dev server on http://${browserHost}:${port}`
  );
}

createServer((req, res) => {
  const currentUrl = req.url ?? "/";
  const parsedUrl = parse(currentUrl, true);
  const pathname = parsedUrl.pathname ?? "/";

  if (pathname === "/api" || pathname.startsWith("/api/")) {
    req.url = currentUrl.replace(/^\/api(?=\/|$)/, "") || "/";
    jsonServerApp.attach(req, res);
    return;
  }

  nextHandler(req, res, parsedUrl);
}).listen(port, hostname, () => {
  console.log(`> Ready on http://${browserHost}:${port}`);
});

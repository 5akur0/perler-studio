const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 5173);
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
};

function safePath(urlPath) {
  const pathname = decodeURIComponent((urlPath || "/").split("?")[0]);
  const normalized = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const target = normalized === "/" ? "/index.html" : normalized;
  return path.join(ROOT, target);
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-cache",
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const filePath = safePath(req.url);
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, "Forbidden");
    return;
  }
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      send(res, 404, "Not Found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";
    const stream = fs.createReadStream(filePath);
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
    stream.pipe(res);
    stream.on("error", () => send(res, 500, "Server Error"));
  });
});

server.listen(PORT, () => {
  console.log(`Perler Studio local server: http://localhost:${PORT}`);
});

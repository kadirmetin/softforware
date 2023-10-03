import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse, UrlWithParsedQuery } from "url";
import next, { NextApiRequest, NextApiResponse } from "next";

const dev: boolean = process.env.NODE_ENV !== "production";
const hostname: string = "localhost";
const port: number = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl: UrlWithParsedQuery = parse(req.url!, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(
          req as NextApiRequest,
          res as NextApiResponse,
          "/a",
          query
        );
      } else if (pathname === "/b") {
        await app.render(
          req as NextApiRequest,
          res as NextApiResponse,
          "/b",
          query
        );
      } else {
        await handle(req as NextApiRequest, res as NextApiResponse, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

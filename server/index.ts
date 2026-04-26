import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./src/routes/index.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/config/logger.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(limiter);

app.use(routes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error("unhandled_middleware_error", {
    error: err instanceof Error ? err.message : "unknown_error",
  });

  return res.status(500).json({
    ok: false,
    error: "Erro interno do servidor.",
  });
});

app.listen(env.PORT, async () => {
  if (env.REDIS_ENABLED) {
    await import("./src/workers/contact.worker.js");
    logger.info("redis_worker_enabled", { redisUrl: env.REDIS_URL });
  } else {
    logger.info("redis_worker_disabled");
  }

  logger.info(`[server] running on http://localhost:${env.PORT}`);
});

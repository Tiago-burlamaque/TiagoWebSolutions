import { Worker } from "bullmq";
import IORedis from "ioredis";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";
import { executeContactService } from "../services/contact.service.js";
import type { ContactJobData } from "../queue/contact.queue.js";

const connection = new IORedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

export const contactWorker = new Worker<ContactJobData>(
  "contact-email",
  async (job) => {
    await executeContactService(job.data);
  },
  {
    connection,
    concurrency: 5,
  }
);

contactWorker.on("completed", (job) => {
  logger.info("contact_email_job_completed", {
    jobId: job.id,
    queue: "contact-email",
  });
});

contactWorker.on("failed", (job, err) => {
  logger.error("contact_email_job_failed", {
    jobId: job?.id,
    queue: "contact-email",
    error: err.message,
  });
});

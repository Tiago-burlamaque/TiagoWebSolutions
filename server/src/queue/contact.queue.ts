 import { Queue } from "bullmq";
import { Redis } from "ioredis";
import { env } from "../config/env.js";

export type ContactJobData = {
  name: string;
  email: string;
  message: string;
};

const connection = env.REDIS_ENABLED
  ? new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
    })
  : null;

export const contactQueue = connection
  ? new Queue<ContactJobData>("contact-email", {
      connection,
      defaultJobOptions: {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: 50,
        removeOnFail: 100,
      },
    })
  : null;

export async function enqueueContactEmail(data: ContactJobData) {
  if (!contactQueue) {
    throw new Error("Redis queue is disabled. Enable REDIS_ENABLED=true to enqueue jobs.");
  }

  return contactQueue.add("send-contact-email", data);
}

import { Kafka } from "kafkajs";
import { prisma } from "./db";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["cluster.playground.cdkt.io:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.CONDUKTOR_PLAYGROUND_USERNAME || "",
    password: process.env.CONDUKTOR_PLAYGROUND_PASSWORD || "",
  },
});

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: "my-group" });

export const sendMessages = async (topic: string, messages: string) => {
  try {
    await producer.connect();

    await producer.send({
      topic,
      messages: [{ value: messages }],
    });
  } catch (error) {
    console.error("Error while sending messages:", error);
  } finally {
    await producer.disconnect();
  }
};

let isConsumerRunning = false;

export const runConsumer = async () => {
  if (isConsumerRunning) {
    console.log("Consumer is already running!");
    return;
  }

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "posts" });

    isConsumerRunning = true;

    await Promise.race([
      consumer.run({
        eachMessage: async ({ message }): Promise<void> => {
          try {
            const users = await prisma.user.findMany();

            await Promise.all(
              users.map(async (user) => {
                const messageValue = message.value?.toString() || "";
                const parsedMessage = JSON.parse(messageValue);

                await prisma.notification.create({
                  data: {
                    message: messageValue,
                    id: parsedMessage.id,
                    user: { connect: { id: user.id } },
                    read: false,
                  },
                });
              })
            );
          } catch (error) {
            console.error("Error while processing each message:", error);
          }
        },
      }),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Consumer took too much time to respond"));
        }, 10000);
      }),
    ]);
  } catch (error) {
    console.error("Error while running consumer:", error);
  } finally {
    isConsumerRunning = false;
    await consumer.disconnect();
  }
};

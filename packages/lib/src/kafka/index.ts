import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";

const brokersEnv = process.env.KAFKA_BROKER;

if (!brokersEnv) {
  throw new Error("KAFKA_BROKER is not defined");
}

const brokerList = brokersEnv.split(",").map((broker) => broker.trim());

export const kafka = new Kafka({
  clientId: "openframe",
  brokers: brokerList,
  // ssl: {
  //   rejectUnauthorized: true,
  //   ca: [process.env.KAFKA_CA_CERT!.replace(/\\n/g, "\n")],
  //   cert: process.env.KAFKA_SERVICE_CERT!.replace(/\\n/g, "\n"),
  //   key: process.env.KAFKA_SERVICE_KEY!.replace(/\\n/g, "\n"),
  // },
});

const producer = kafka.producer();

export const kafkaProduceMessage = async (topic: string, message: string) => {
  await producer.connect();

  await producer.send({
    topic,
    messages: [{ value: message }],
  });

  await producer.disconnect();
};

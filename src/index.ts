import pino from "pino";
import pinoPretty from "pino-pretty";
import Fastify from "fastify";
const fastify = Fastify({logger: pino(pinoPretty({singleLine: true}))});


fastify.listen({host: "0.0.0.0", port: 8080}, (error) => {
  if (!error) {
    process.on("uncaughtException", (error) => {
      fastify.log.error(error, `[uncaughtException]: ${(error as Error).message}`);
    });
    process.on("unhandledRejection", (error) => {
      fastify.log.error(error, `[unhandledRejection]: ${(error as Error).message}`);
    });
  } else {
    fastify.log.error(error);
    process.exit(1);
  }
});

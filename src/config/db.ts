import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query"],
  errorFormat: "pretty",
});

const connectDB = () => {
  try {
    prisma.$connect();
    console.log("Database is Connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export { prisma, connectDB };

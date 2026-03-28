import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

async function main() {

   const message = await prisma.message.create({
    data: {
        authorName: "Markin Relâmpago",
        content: "O tigre é o felino e na caça é implacável.",
    },
  }); 

    console.log("Message created:", message);

}

main()
  .catch((e) => {
    console.error(e);
  });
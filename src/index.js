import dotenv from "dotenv";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createClient } from "./client.js";

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;
const model = process.env.MODEL || "claude-sonnet-4-20250514";

async function main() {
  const client = createClient(apiKey);

  const rl = readline.createInterface({ input, output });
  const prompt = await rl.question("Digite sua pergunta para o Claude: ");
  rl.close();

  const response = await client.messages.create({
    model,
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const text = response.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("\n");

  console.log("\nResposta do Claude:\n");
  console.log(text);
}

main().catch((error) => {
  console.error("Erro:", error.message);
  process.exit(1);
});

import Anthropic from "@anthropic-ai/sdk";

export function createClient(apiKey) {
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is missing");
  }

  return new Anthropic({
    apiKey
  });
}

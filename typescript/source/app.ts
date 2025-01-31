import { AzureChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { ChatOllama } from "@langchain/ollama";
import { createReactAgent, AgentExecutor } from "langchain/agents";
import wiki_search from "./tools.js";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { react_prompt, template } from "./prompts.js";
import wiki_search_tool from "./tools.js";

dotenv.config();

async function main() {
  try {
    const ollama_model = new ChatOllama({
      model: "llama3.2",
    });

    const azure_model = new AzureChatOpenAI({
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
      azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
    });

    const agent = await createReactAgent({
      llm: azure_model,
      prompt: react_prompt,
      tools: [wiki_search_tool],
    });

    const executor = AgentExecutor.fromAgentAndTools({
      agent: agent,
      tools: [wiki_search_tool],
      verbose: true,
    });

    const res = await executor.invoke({
      input: await template.invoke({ person: "Tom Brady" }),
    });

    console.log(res);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});

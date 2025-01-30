import { AzureChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOllama } from "@langchain/ollama";

dotenv.config();

type ChatInput = {
  country: string;
};

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

    const prompt_template = PromptTemplate.fromTemplate(
      "What colors are there in {country} flag?"
    );

    const chain = prompt_template.pipe(ollama_model);

    const input: ChatInput = {
      country: "USA",
    };

    const res = await chain.invoke(input);

    console.log(res.content);
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Execute the main function
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});

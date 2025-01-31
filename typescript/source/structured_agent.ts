import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
import { AzureChatOpenAI, ChatOpenAI } from "@langchain/openai";
import wiki_search_tool from "./tools.js";

dotenv.config();

const tools = [wiki_search_tool];

const prompt = await pull<ChatPromptTemplate>(
  "hwchase17/structured-chat-agent"
);

const llm = new AzureChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
});

const agent = await createStructuredChatAgent({
  llm,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
  verbose: true,
});

const result = await agentExecutor.invoke({
  input: "Who is Michael Myers?",
});

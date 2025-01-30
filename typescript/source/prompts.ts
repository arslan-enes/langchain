import { PromptTemplate } from "@langchain/core/prompts";
import parser from "./structures.js";

const react_prompt = PromptTemplate.fromTemplate(`
  Answer the following questions as best you can. You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

Question: {input}
Thought:{agent_scratchpad}`);

const template = new PromptTemplate({
  template: "Write a summary about {person} \n {format_instructions}",
  inputVariables: ["person"],
  partialVariables: {
    format_instructions: parser.getFormatInstructions(),
  },
});

export { react_prompt, template };

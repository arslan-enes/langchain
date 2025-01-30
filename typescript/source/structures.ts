import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

const output_schema = z.object({
  title: z.string().describe("Title of the summary."),
  summary: z.string().describe("Summary"),
});

const parser = StructuredOutputParser.fromZodSchema(output_schema);

export default parser;

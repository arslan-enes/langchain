import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

async function wiki_search(person: string): Promise<string> {
  const w = new WikipediaQueryRun({
    topKResults: 3,
    maxDocContentLength: undefined,
  });
  return await w.invoke(person);
}

const wiki_search_tool = tool(wiki_search, {
  name: "Wikipedia Search Tools",
  description:
    "Search information from wikipedia which is the biggest encyclopedia in web.",
  schema: z.string(),
});

export default wiki_search_tool;

import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

async function wiki_search(person: string): Promise<string> {
  const w = new WikipediaQueryRun({
    topKResults: 3,
    maxDocContentLength: undefined,
  });
  return await w.invoke(person);
}

export default wiki_search;

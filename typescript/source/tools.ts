import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";

async function wiki_search(topic: string): Promise<string> {
  const w = new WikipediaQueryRun({
    topKResults: 3,
    maxDocContentLength: undefined,
  });
  return await w.invoke(topic);
}

const res = await wiki_search("Barack Obama");

console.log(res);

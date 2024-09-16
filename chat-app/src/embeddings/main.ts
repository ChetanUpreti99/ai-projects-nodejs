import { readFileSync,writeFileSync} from "fs";
import {  join} from "path";
import OpenAI from "openai";

const openai = new OpenAI();


export type DataWithEmbeddings = {
    input: string;
    embeddings: number[];
};


export const generateEmbeddings = async (input: string | string[]) => {
    const response = await openai.embeddings.create({
      input: input,
      model: "text-embedding-3-small",
    });
    console.log(response.data);
    return response;
};
  
export const loadInputJson =<T> (fileName:string):T=>{
    const path = join(__dirname, fileName);
    const rawInputData = readFileSync(path);
    return JSON.parse(rawInputData.toString());
}

const saveEmbeddingsToJson = (embeddings: any, fileName: string) => {
    const embeddingsString = JSON.stringify(embeddings);
    const buffer = Buffer.from(embeddingsString);
    const path = join(__dirname, fileName);
    writeFileSync(path, buffer);
    console.log(`Embeddings saved to ${path}`);
  };

  
const main  = async()=>{
    const input = loadInputJson<string[]>("input.json");
    const embeddings = await generateEmbeddings(input);
    const dataWithEmbeddings: DataWithEmbeddings[] = input.map(
        (input, index) => ({
          input,
          embeddings: embeddings.data[index].embedding,
        })
      );
      saveEmbeddingsToJson(dataWithEmbeddings, "output.json");
}

main(); 
import OpenAI from "openai";
import { encoding_for_model } from "tiktoken";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function main() {
    // Define the prompt
    const prompt = "I need to start resistance training. Can you create a 7-day detailed workout plan for me to ease into it? Limit it in 100 words or less.";
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: prompt }
        ],
    });

     // Print the response
    console.log(completion.choices[0].message.content);
}


const encodePrompt = (prompt:string)=>{
    // create an encoder for the model
    const encoder = encoding_for_model("gpt-3.5-turbo");
    // encode the prompt
    const tokens = encoder.encode(prompt);
    console.log(tokens);

}

encodePrompt( 
    "I need to start resistance training. Can you create a 7-day detailed workout plan for me to ease into it? Limit it in 100 words or less."
);
main();
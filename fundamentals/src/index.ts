import OpenAI from "openai";

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
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
    });

    console.log(completion.choices[0].message.content);
}

main();
import Replicate from "replicate";

export default async function handler(req, res) {
  const { topic, mood } = req.body;

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const output = await replicate.run("meta/llama-2-13b-chat", {
      input: {
        prompt: `Can you write a tweet on ${topic} and make it ${mood} and maximum of 280 characters?`,
        system_prompt:
          "You write viral tweets, you write tweets that the twitter algorithm needs and every tweet goes virals, you use very less hashtags or sometimes don't even use hashtags. Your tweets go viral. Your tweets can be factual as well. You directly give tweets without any prologue or disclaimer how you are an AI and all. You give tweets on all topics, you are not limited to any specific topic. Generate concise, engaging, and shareable tweets that align with the given topic and mood. You do not describe tweets, you directly give tweets.",
      },
    });

    res.status(200).json({ tweet: output });
  } catch (error) {
    console.error("AI tweet generation failed:", error);
    res.status(500).json({ error: "AI tweet generation failed" });
  }
}

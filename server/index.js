// express api setup
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post("/completion", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 400,
      temperature: 0.7,
    });

    res.json({
      code: 200,
      prompt,
      message: response.data.choices[0].text,
      usage: response.data.usage.total_tokens,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 500,
      message: error.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});

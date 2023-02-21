import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { options, budgetMin, budgetMax, ocassion, hobbies, relationship } = req.body
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  // const city = req.body.city || '';
  // if (city.trim().length === 0) {
  //     res.status(400).json({
  //         error: {
  //             message: "Please enter a valid animal",
  //         }
  //     });
  //     return;
  // }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(options, budgetMin, budgetMax, ocassion, hobbies, relationship),
      temperature: 0.6,
      max_tokens: 3000
    });
    res.status(200).json({ result: completion.data.choices });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(options, budgetMin, budgetMax, ocassion, hobbies, relationship) {
            const prompt =  `Give me 3 present ideas for my ${relationship} for ${ocassion}. This person have hobbies like ${hobbies}. Give me options to the stuffs that this person likes. The buget is between ${budgetMin} and ${budgetMax} pounds.`
  // const prompt = 'Who won the last football world cup'

  console.log(prompt)
  return prompt
}



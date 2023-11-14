// import { Configuration, OpenAIApi } from "openai";

const gpt3apiController = {};

gpt3apiController.sendBackData = async (req, res, next) => {
  // res.locals.ourData

  // const API_URL = 'https://api.openai.com/v1/chat/completions';
  // const API_KEY = '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';

  try{
    console.log("im insidde")
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model:"gpt-3.5-turbo",
          messages: [{role: "user", content: `${req.body.message}`}]
        })
      }
    );
      const data = await pipeline(response.body, res);
      res.locals.ourData = data;
      next();
  } catch(err) {
    console.log(err);
  }
  }




const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = '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';

async function getSkincareProductRecommendations(userSkinType, userSkinConcerns, userAllergies) {
  const userPrompt = `I have ${userSkinType} skin, with skin concerns related to ${userSkinConcerns.join(', ')} and allergies to ${userAllergies.join(', ')}. Can you recommend skincare products that are safe for me?`;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model:"gpt-3.5-turbo",
      messages: [{role: "user", content: "I have dry skin, with skin concerns related to acne and allergies to strawberry. Can you recommend skincare products that are safe for me?"}]
  },
  )};

  try {
    const response = await fetch(API_URL, requestOptions);
    if (!response.ok) {
      throw new Error(`GPT-3 API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    const gpt3Recommendation = data.choices[0].text;
    const productEntries = gpt3Recommendation.split(', ');

    const productRecommendations = productEntries.slice(0, 5).map(entry => {
      const [name, category, ...activeIngredients] = entry.split(': ');
      return {
        name,
        category,
        activeIngredients,
        skinType: userSkinType,
        description: `Description of ${name}`,
      };
    });

    return productRecommendations;
  } catch (error) {
    throw new Error(`GPT-3 API request failed: ${error.message}`);
  }
}

module.exports = gpt3apiController;

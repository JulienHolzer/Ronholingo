import fetch from 'node-fetch';

exports.handler = async function (event, context) {
    const { word, targetLanguage, category } = JSON.parse(event.body);

    if (!word || !targetLanguage) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid input' }),
        };
    }

    try {
        console.log('API Key:', process.env.OPEN_AI_KEY);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a flashcard game assistant designed to help players guess words by providing hints. " +
                            "Your goal is to provide helpful and challenging hints, without revealing the answer directly." },

                    { role: "user", content: `Provide a single, clever hint to help me guess the word "${word}" which belongs to the category "${category}". 
                    The hint should be exclusively in the "${targetLanguage}" language. Do not include the original word, and make sure the hint is relevant but not too obvious.` }
                ],
                max_tokens: 200
            })
        });

        if (!response.ok) {
            let errorMessage = await response.text();
            throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }

        const data = await response.json();
        if (!data.choices || data.choices.length === 0) {
            throw new Error('Invalid response from API');
        }

        const hint = data.choices[0].message.content.trim();

        return {
            statusCode: 200,
            body: JSON.stringify({ hint }),
        };

    } catch (error) {
        console.error('Error during the translation:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
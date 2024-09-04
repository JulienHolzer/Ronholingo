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
                    { role: "system", content: "You are a dictionary." },
                    { role: "user", content: `Give me the definition and an example of the word "${word}" that specifically belongs to the category "${category}". 
                    The definition should be relevant only to this category : ${category} and exclude any meanings or uses that do not fit within it. 
                    Provide the answer exclusively in the "${targetLanguage}" language, and use the following markdown format:
                        **Definition:** [Insert definition specific to the category].  
                        **Example:** [Insert example specific to the category]. ` }
                ],
                max_tokens: 300
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

        const definition = data.choices[0].message.content.trim();

        return {
            statusCode: 200,
            body: JSON.stringify({ definition }),
        };

    } catch (error) {
        console.error('Error during the translation:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

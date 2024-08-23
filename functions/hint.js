import fetch from 'node-fetch';

exports.handler = async function (event, context) {
    const { word, targetLanguage } = JSON.parse(event.body);

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
                    { role: "system", content: "You are a flashcard game." },
                    { role: "user", content: `Give me the hints for this word :  ${word} in the following language ${targetLanguage}, do not forget that I am playing a flashcard game` }
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
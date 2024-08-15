const fetch = require('node-fetch');

console.log('API Key:', process.env.OPEN_AI_KEY);

exports.handler = async function (event, context) {
    const { inputText, targetLanguage } = JSON.parse(event.body);

    if (!inputText || !targetLanguage) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid input' }),
        };
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a translation assistant." },
                    { role: "user", content: `Translate the following text to ${targetLanguage} (only the translation, nothing else): ${inputText}` }
                ],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        if (!data.choices || data.choices.length === 0) {
            throw new Error('Invalid response from API');
        }

        const translation = data.choices[0].message.content.trim();

        return {
            statusCode: 200,
            body: JSON.stringify({ translation }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

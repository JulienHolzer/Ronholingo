import fetch from 'node-fetch';

exports.handler = async function (event) {
    const {word, lang } = JSON.parse(event.body);

    if (!word) {
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
                    { role: "system", content: "You are a translator." },
                    { role: "user", content: `Please provide the translation of the word "${word}" in ${lang} into the following languages in JSON format, following the structure below: 
                    {
                        french: word,
                        english: word,
                        spanish: word,
                        vietnamese: word,
                        japanese: word,
                        german: word,
                        italian: word
                    } Ensure the response is formatted as valid JSON.` }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();
        if (!data.choices || data.choices.length === 0) {
            throw new Error('Invalid response from API');
        }


        const translationsJSON = data.choices[0].message.content.trim();

        return {
            statusCode: 200,
            body: JSON.stringify({translationsJSON}),
        };

    } catch (error) {
        console.error('Error during the translation:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
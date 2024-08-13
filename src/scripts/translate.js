
/*
document.getElementById('translateButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const outputTextArea = document.getElementById('outputText');
    const sourceLanguage = document.getElementById('sourceLanguage').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    if (!inputText.trim()) {
        alert('Please enter some text to translate.');
        return;
    }

    try {
        //emplacement de la clé...
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
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
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const translation = data.choices[0].message.content.trim();
        outputTextArea.value = translation;

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to translate the text.');
    }
});

document.getElementById('inputAudio').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    speak(inputText, document.getElementById('sourceLanguage').value);
});

document.getElementById('outputAudio').addEventListener('click', () => {
    const outputText = document.getElementById('outputText').value;
    speak(outputText, document.getElementById('targetLanguage').value);
});

function speak(text, language) {
    if (!text.trim()) {
        alert('No text to speak.');
        return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
}
*/

document.getElementById('translateButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const outputTextArea = document.getElementById('outputText');
    const targetLanguage = document.getElementById('targetLanguage').value;

    if (!inputText.trim()) {
        alert('Please enter some text to translate.');
        return;
    }

    try {
        //const response = await fetch('/.netlify/functions/translate', {
            const response = await fetch('/.Ronholingo/functions/translate', {

                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                inputText,
                targetLanguage
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        outputTextArea.value = data.translation;

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to translate the text.');
    }
});

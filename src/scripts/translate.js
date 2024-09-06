
document.getElementById('translateButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value.trim();
    const outputTextArea = document.getElementById('outputText');
    const targetLanguage = document.getElementById('targetLanguage').value.trim();

    if (!inputText.trim()) {
        alert('Please enter some text to translate.');
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/translate', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const axios = require('axios');

// Initialize a TextToSpeechClient instance using your JSON key file
const client = new TextToSpeechClient({
  keyFilename: './mindful-bivouac-417320-7d27adbd895b.json',
});

async function generateAudio(text) {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent.toString('base64');
  } catch (error) {
    console.error('Error generating audio:', error);
    throw error;
  }
}

async function playAudio(audioData) {
  try {
    // Send audio data to the client for playback
    const response = await axios.post('/play-audio', { audioData });
    console.log(response.data); // Log playback status or handle it as needed
  } catch (error) {
    console.error('Error playing audio:', error);
  }
}

module.exports = { generateAudio, playAudio };

// keyFilename: '/mindful-bivouac-417320-7d27adbd895b.json',
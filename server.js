const express = require('express');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const client = new TextToSpeechClient({ keyFilename: './mindful-bivouac-417320-7d27adbd895b.json' });

app.get('/api/speak', async (req, res) => {
  const pokemonDescription = req.query.pokemonDescription;
  const request = {
    input: { text: pokemonDescription },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mp3');
    res.send(response.audioContent);
  } catch (err) {
    console.error('Error generating speech:', err);
    res.status(500).send('Error generating speech');
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

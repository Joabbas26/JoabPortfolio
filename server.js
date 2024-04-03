import express from 'express';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new TextToSpeechClient({
  keyFilename: import.meta.env.VITE_GOOGLE_APPLICATION_CREDENTIALS,
});

app.options('/pokedex/api/speak', cors());

app.post('/pokedex/api/speak', async (req, res) => {
  console.log('Received request at /pokedex/api/speak');
  
  const { text, languageCode, voice } = req.query;

  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: voice },
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

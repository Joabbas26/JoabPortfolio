import express from 'express';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

const client = new TextToSpeechClient({
  projectId: 'mindful-bivouac-417320',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

app.options('/pokedex/api/speak', cors());

app.get('/pokedex/api/speak', async (req, res) => {
  console.log('Received request at /pokedex/api/speak');
  
  const { text, languageCode, voice } = req.query;

  if (!text ||!languageCode ||!voice) {
    return res.status(400).send('Missing required parameters');
  }

  try {
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode, name: voice },
      audioConfig: { audioEncoding: 'MP3' },
    });
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('Error synthesizing speech:', err);
    res.status(500).send('Error synthesizing speech');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

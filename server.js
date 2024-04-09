import express from 'express';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

let credentials;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
} else {
  // Fallback to using the service account JSON file
  credentials = require('./src/JSON/serviceaccount.json');
}

const client = new TextToSpeechClient({
  projectId: 'mindful-bivouac-417320',
  credentials: credentials,
});

app.options('/pokedex/api', cors());

app.post('/pokedex/api', async (req, res) => {
  console.log('Received request at /pokedex/api');
  
  const { text, voice } = req.query;

  if (!text || !voice) {
    return res.status(400).send('Missing required parameters');
  }

  try {
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { name: voice },
      audioConfig: { audioEncoding: 'MP3' },
    });
    const audioUrl = response.audioContent;
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(audioUrl);
    res.status(200).json({ audioUrl });
  } catch (err) {
    console.error('Error synthesizing speech:', err);
    res.status(500).send('Error synthesizing speech');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

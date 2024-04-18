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

app.get('/pokedex/', async (req, res) => {
  console.log('Received request at /pokedex/');

  const { text, voice } = req.query;

  if (!text ||!voice) {
    return res.status(400).send('Missing required parameters');
  }

  try {
    // Generate the TTS audio
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: { languageCode: 'en-US', name: 'en-US-Wavenet-C'},
      audioConfig: { audioEncoding: 'MP3' },
    });

    // Return the generated audio as a binary response
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('Error synthesizing speech:', err);
    res.status(500).send('Error synthesizing speech: ' + err.message);
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.error('Error starting server:', err);
  }
  console.log(`Server is running at http://localhost:${port}`);
});
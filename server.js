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

app.options('/pokedex', cors());

app.post('/pokedex', async (req, res) => {
  console.log('Received request at /pokedex');
  
  const { text, voice } = req.query;

  if (!text ||!voice) {
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

import express from 'express';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

const client = new TextToSpeechClient({ keyFilename: import.meta.env.VITE_GOOGLE_APPLICATION_CREDENTIALS});

// Added route for preflight requests
app.options('/pokedex/api/speech/', cors());

app.get('/pokedex/api/speech/', async (req, res) => {
  console.log('Received request at /pokedex/api/speech/');

  const { text, languageCode, voice } = req.query;

  const request = {
    input: { text },
    voice: { languageCode, ssmlGender: voice},
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    // Synthesize speech using the Google Cloud Text-to-Speech API
    const [response] = await client.synthesizeSpeech(request);

    // Set response headers and send audio data
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

import express from 'express';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors()); // Adjusted position for broader CORS handling
app.use(express.json());

const client = new TextToSpeechClient({ keyFilename: import.meta.env.VITE_SERVICE_ACCOUNT_KEY_PATH});

// Added route for preflight requests
app.options('/pokedex/api/speak', cors());

app.get('/pokedex/api/speak', async (req, res) => {
  console.log('Received request at /pokedex/api/speak');
  const pokemonDescription = req.query.pokemonDescription;

  const request = {
    input: { text: pokemonDescription },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    // Synthesize speech using the Google Cloud Text-to-Speech API
    const [response] = await client.synthesizeSpeech(request);

    const keyFileContents = fs.readFileSync(keyFilePath, 'utf8');
    console.log('Service Account Key Contents:', keyFileContents);

    // Set response headers and send audio data
    res.set('Content-Type', 'audio/mp3');
    res.send(response.audioContent);
  } catch (err) {
    console.error('Error generating speech:', err);
    console.error('Error reading service account key file:', err);
    res.status(500).send('Error generating speech');
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import cors from 'cors'
const app = express();
import dotenv from 'dotenv';
dotenv.config();


app.use(cors()); // Adjusted position for broader CORS handling
app.use(express.json());

const client = new TextToSpeechClient({ keyFilename: './serviceaccount.json' });

// Added route for preflight requests
app.options('/pokedex/api/speak', cors());

app.get('/pokedex/api/speak', async (req, res) => {
  const pokemonDescription = req.query.pokemonDescription || '';
  if (!pokemonDescription.trim()) {
    return res.status(400).send('Please provide a valid pokemonDescription');
  }

  const request = {
    input: { text: pokemonDescription },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
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

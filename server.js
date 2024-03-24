const express = require('express');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const cors = require('cors');
const app = express();

require('dotenv').config()

app.use(cors());
app.use(express.json());

const client = new TextToSpeechClient({ keyFilename: './serviceaccount.json' });

app.options('pokedex/api/speak', cors()); 

app.get('pokedex/api/speak', async (req, res) => {
  const pokemonDescription = req.query.pokemonDescription;

  // Check if pokemonDescription is defined and convert to string if necessary
  if (typeof pokemonDescription !== 'string') {
    pokemonDescription = ''; // Set to empty string if not a string
  }
  
  const request = {
    input: { text: pokemonDescription},
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3'},
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

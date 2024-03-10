const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5173;

app.use(express.json());
app.use(cors());

app.post('/tts', async (req, res) => {
  const { pokemonDescription } = req.body;

  try {
    const url = 'https://api.play.ht/api/v2/tts';
    const options = {
      method: 'POST',
      headers: { 
        accept: 'text/event-stream',
        'content-type': 'application/json',
        AUTHORIZATION: '4daa26aae47e4abc900a62f3a31cc304',
        'X-USER-ID': 'cdIx41tSTpXLx2v30PXhQ36hflH3'
      },
      body: JSON.stringify({
        text: pokemonDescription,
        voice: 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',
        output_format: 'mp3',
        voice_engine: 'PlayHT2.0'
      })
    };

    const response = await fetch(url, options);
    const audioUrl = response.url; // Assuming the response contains the URL of the generated audio

    // Send the audio URL back to the client
    res.json({ audioUrl });
  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('*', (req, res) => {
  console.log(`Unhandled route: ${req.method} ${req.path}`);
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


/* 


AUTHORIZATION: '4daa26aae47e4abc900a62f3a31cc304',
'X-USER-ID': 'cdIx41tSTpXLx2v30PXhQ36hflH3',
        
        
*/
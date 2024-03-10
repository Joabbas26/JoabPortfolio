import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'; 

const app = express();
const port = process.env.PORT || 5173;

app.use(express.json());
app.use(cors()); 

app.post('/tts', async (req, res) => {
  const { text, voice, output_format } = req.body;
  console.log('Received request:', { text, voice, output_format });
  res.status(200).send('OK');

  try {
    const response = await fetch('https://api.play.ht/api/v2/tts/stream', {
      method: 'POST',
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        Authorization: '4daa26aae47e4abc900a62f3a31cc304',
        'X-USER-ID': 'cdIx41tSTpXLx2v30PXhQ36hflH3',
      },
      body: JSON.stringify({ text, voice, output_format }),
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      throw new Error(`Error fetching audio: ${response.statusText}`);
    }

    const readableStream = response.body;
    res.setHeader('Content-Type', 'audio/mpeg');
    readableStream.pipe(res);
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
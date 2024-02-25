const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

app.post('/tts', async (req, res) => {
  const { text, voice, output_format, ...options } = req.body;

  try {
    const response = await fetch('https://api.play.ht/api/v2/tts/stream', {
      method: 'POST',
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        AUTHORIZATION: '4daa26aae47e4abc900a62f3a31cc304',
        'X-USER-ID': 'cdIx41tSTpXLx2v30PXhQ36hflH3',
      },
      body: JSON.stringify({
        text,
        voice,
        output_format,
        ...options,
      }),
    });

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
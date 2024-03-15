const express = require('express');
const { generateAudio } = require('./GoogleCloudTTS');
const app = express();
const port = 5173;

app.use(express.json());

app.post('/play-audio', async (req, res) => {
  const { audioData } = req.body;
  console.log('Received audio data:', audioData);

  try {
    const outputFile = 'audio.mp3';
    // Generate audio using Google Cloud TTS
    const audioFile = await generateAudio(audioData, outputFile);

    // Send the generated audio file to the client
    res.sendFile(audioFile, { root: __dirname });
  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).send({ error: 'Error generating audio' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

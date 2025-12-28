const express = require('express');
const cors = require('cors');
const ytdl = require('@distube/ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' directory

app.get('/convert', async (req, res) => {
    try {
        const videoURL = req.query.url;
        if (!videoURL || !ytdl.validateURL(videoURL)) {
            return res.status(400).json({ error: 'Invalid or missing YouTube URL' });
        }

        const info = await ytdl.getInfo(videoURL);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, ''); // Sanitize title

        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        res.header('Content-Type', 'audio/mpeg');

        // Get audio stream from YouTube
        const stream = ytdl(videoURL, {
            quality: 'highestaudio',
        });

        // Convert to MP3 using ffmpeg
        ffmpeg(stream)
            .audioBitrate(128)
            .format('mp3')
            .on('error', (err) => {
                console.error('FFmpeg Error:', err);
                // Only send error if headers haven't been sent (stream might have started)
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Conversion failed' });
                }
            })
            .pipe(res, { end: true });

    } catch (error) {
        console.error('Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Server error during conversion' });
        }
    }
});

const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying port ${PORT + 1}...`);
        app.listen(PORT + 1, () => {
            console.log(`Server is running on http://localhost:${PORT + 1}`);
        });
    } else {
        console.error('Server error:', e);
    }
});

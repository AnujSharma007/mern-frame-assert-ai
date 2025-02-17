const Video = require('../models/Video');
const logger = require('../utils/logger');

exports.uploadVideo = async (req, res) => {
  try {
    const { filename, path } = req.file;
    const video = new Video({ filename, path });
    await video.save();
    logger.info(`Video uploaded: ${filename}`);
    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (err) {
    logger.error(`Error uploading video: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};
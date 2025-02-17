const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const extractFrames = async () => {
  const videosDir = path.join(__dirname, '../uploads');
  const framesDir = path.join(__dirname, '../frames');
  const videos = fs.readdirSync(videosDir).slice(0, 4); // Select 4 random videos
  const frames = [];

  videos.forEach((video, index) => {
    const output = path.join(framesDir, `frame_${index}.jpg`);
    const command = `ffmpeg -i ${path.join(videosDir, video)} -vf fps=1/3 -vframes 1 ${output}`;
    exec(command, (err) => {
      if (err) logger.error(`Error extracting frame: ${err}`);
    });
    frames.push(output);
  });

  return frames;
};

module.exports = { extractFrames };
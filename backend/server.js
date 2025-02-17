const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const videoRoutes = require('./routes/videoRoutes');
const { extractFrames } = require('./utils/frameExtractor');
const logger = require('./utils/logger');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());

// Routes
app.use('/api/videos', videoRoutes);

// MongoDB Connection
mongoose.connect('mongodb://mongo:27017/videos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => logger.info('MongoDB connected'))
.catch((err) => logger.error('MongoDB connection error:', err));

// Socket.IO
io.on('connection', (socket) => {
  logger.info('Client connected');
  socket.on('disconnect', () => {
    logger.info('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Frame extraction and streaming
setInterval(async () => {
  const frames = await extractFrames();
  io.emit('frames', frames);
}, 3000);
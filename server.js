const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON body parsing for API requests
app.use(express.json());

// Serve static assets from the visual-resume directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    candidate: 'Jana Arvind Surya',
    role: 'AI Application Engineer / Full-Stack AI Developer',
    ambassador: 'Active and Grounded',
    timestamp: new Date().toISOString()
  });
});

// Single Page Application fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Visual Resume & Virtual Ambassador is live!`);
  console.log(`👉 Local:   http://localhost:${PORT}`);
  console.log(`👉 Network: http://0.0.0.0:${PORT}`);
  console.log(`👤 Candidate: Jana Arvind Surya`);
  console.log(`🎯 Target Role: AI Application Engineer`);
  console.log(`🤖 Virtual Ambassador: Ready for Recruiter Inquiries`);
  console.log(`======================================================\n`);
});

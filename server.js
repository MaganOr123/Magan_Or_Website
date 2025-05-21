const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express();

// Version tracking
let currentVersion = Date.now().toString();

// Update version when files change
function updateVersion() {
    currentVersion = Date.now().toString();
}

// Watch for file changes
fs.watch(__dirname, (eventType, filename) => {
    if (filename && (filename.endsWith('.html') || filename.endsWith('.css') || filename.endsWith('.js'))) {
        updateVersion();
    }
});

// Version endpoint
app.get('/version.txt', (req, res) => {
    res.send(currentVersion);
});

// Disable caching for HTML files
app.use((req, res, next) => {
    if (req.path.endsWith('.html')) {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
    }
    next();
});

// SSL certificate configuration
const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt')
};

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve files from the Files directory
app.use('/Files', express.static(path.join(__dirname, 'Files')));

// Handle the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the English version
app.get('/english', (req, res) => {
    res.sendFile(path.join(__dirname, 'indexendlish.html'));
});

// Create HTTP server
const server = http.createServer(app);

// Start the server
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
    console.log('To make the site accessible from anywhere, run: lt --port 3000');
});
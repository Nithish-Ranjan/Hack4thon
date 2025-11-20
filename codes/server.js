const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Phishing Check Logic
function checkPhishing(url) {
  const reasons = [];

  if (url.includes("free") || url.includes("win")) {
    reasons.push("Suspicious keywords detected");
  }
  if (url.length > 70) {
    reasons.push("URL is unusually long");
  }
  if (url.includes("@")) {
    reasons.push("Contains '@' (common in phishing URLs)");
  }

  return {
    isPhishing: reasons.length > 0,
    reasons
  };
}

// API endpoint
app.post('/check-url', (req, res) => {
  const { url } = req.body;
  res.json(checkPhishing(url));
});

// Start Server
app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);

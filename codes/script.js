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

document.getElementById('urlForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const url = document.getElementById('urlInput').value;
  const resultDiv = document.getElementById('result');

  const data = checkPhishing(url);

  resultDiv.innerHTML = data.isPhishing
    ? "<p style='color:red;'>⚠️ Phishing detected!<br>Reasons: " + data.reasons.join(', ') + "</p>"
    : "<p style='color:green;'>✔️ URL appears safe.</p>";
});

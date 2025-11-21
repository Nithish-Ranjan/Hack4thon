// -------------------- PHISHING CHECK FUNCTION --------------------
function checkPhishing(url) {
    let reasons = [];
    url = url.toLowerCase();

    let cleanURL = url.trim();

    // Ensure URL has protocol
    if (!cleanURL.startsWith("http://") && !cleanURL.startsWith("https://")) {
        cleanURL = "https://" + cleanURL;
    }

    let hostname = "";
    try {
        hostname = new URL(cleanURL).hostname;
    } catch {
        return {
            isPhishing: true,
            reasons: ["Invalid URL format"]
        };
    }

    // 1. Suspicious keywords
<<<<<<< HEAD
    const badWords = ["free", "win", "bonus", "money", "gift", "offer"];
    badWords.forEach(word => {
        if (cleanURL.toLowerCase().includes(word)) {
            reasons.push(`Contains suspicious keyword: "${word}"`);
=======
    const suspiciousWords = ["free", "win", "bonus", "money", "gift", "offer"];
    suspiciousWords.forEach(word => {
        if (url.includes(word)) {
            reasons.push(`Suspicious keyword detected: "${word}"`);
>>>>>>> 91debca (updated and user friendly)
        }
    });

    // 2. Very long URL
    if (cleanURL.length > 70) {
        reasons.push("URL is unusually long");
    }

    // 3. Contains '@'
<<<<<<< HEAD
    if (cleanURL.includes("@")) {
        reasons.push("Contains '@' symbol (used to hide real domain)");
    }

    // 4. No HTTPS
    if (!cleanURL.startsWith("https://")) {
        reasons.push("URL is not HTTPS (less secure)");
    }

    // 5. IP address as domain
    const ipPattern = /^\d{1,3}(\.\d{1,3}){3}$/;
    if (ipPattern.test(hostname)) {
        reasons.push("Uses raw IP address instead of domain name");
    }

    // 6. Too many subdomains
    const domainParts = hostname.split(".");
    if (domainParts.length > 4) {
        reasons.push("Too many subdomains (common in phishing)");
    }

    // 7. Suspicious TLDs
    const badTLD = [".xyz", ".click", ".gift", ".top", ".loan", ".work"];
    badTLD.forEach(tld => {
        if (hostname.endsWith(tld)) {
            reasons.push(`Suspicious domain extension: ${tld}`);
        }
    });

    // 8. Numbers replacing letters
    if (/[a-zA-Z]+\d+[a-zA-Z]+/.test(hostname)) {
        reasons.push("Domain contains unusual number patterns");
    }

    // 9. Encoded characters
    if (/[%=]/.test(cleanURL)) {
=======
    if (url.includes("@")) {
        reasons.push("Contains '@' symbol — often used to mask real domain");
    }

    // 4. No HTTPS
    if (!url.startsWith("https://")) {
        reasons.push("Connection is not secure (HTTPS missing)");
    }

    // 5. IP address instead of domain
    const ipPattern = /https?:\/\/\d{1,3}(\.\d{1,3}){3}/;
    if (ipPattern.test(url)) {
        reasons.push("URL uses an IP address instead of domain name");
    }

    // 6. Too many subdomains
    const parts = url.split(".");
    if (parts.length > 4) {
        reasons.push("Too many subdomains — common in phishing attempts");
    }

    // 7. Suspicious TLDs
    const riskyTLDs = [".xyz", ".click", ".gift", ".top", ".loan", ".work"];
    riskyTLDs.forEach(tld => {
        if (url.endsWith(tld)) {
            reasons.push(`Suspicious domain extension detected: ${tld}`);
        }
    });

    // 8. Strange number-letter mix
    if (/[a-zA-Z]+\d+[a-zA-Z]+/.test(url)) {
        reasons.push("Unusual number patterns found in domain");
    }

    // 9. Encoded characters
    if (/[%=]/.test(url)) {
>>>>>>> 91debca (updated and user friendly)
        reasons.push("Contains encoded characters (% or =)");
    }

    // 10. Repeated characters
<<<<<<< HEAD
    if (/(.)\1\1/.test(hostname)) {
        reasons.push("Contains repeated characters (spam pattern)");
=======
    if (/(.)\1\1/.test(url)) {
        reasons.push("Contains repeated characters (spam-like behavior)");
>>>>>>> 91debca (updated and user friendly)
    }

    return {
        isPhishing: reasons.length > 0,
        reasons
    };
}

// -------------------- URL CHECK BUTTON --------------------
function analyzeURL() {
    const url = document.getElementById("urlInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!url) {
        resultDiv.innerHTML = `<p class="danger">⚠️ Please enter a valid URL!</p>`;
        return;
    }

    const analysis = checkPhishing(url);

    if (analysis.isPhishing) {
        resultDiv.innerHTML = `
<<<<<<< HEAD
            <p class='danger'>⚠️ Warning! URL may be dangerous</p>
            <ul>${data.reasons.map(r => `<li>${r}</li>`).join("")}</ul>
=======
            <p class="danger">⚠️ Potential Phishing Detected!</p>
            <ul>${analysis.reasons.map(reason => `<li>${reason}</li>`).join("")}</ul>
>>>>>>> 91debca (updated and user friendly)
        `;
    } else {
        resultDiv.innerHTML = `<p class="safe">✔️ This URL appears safe!</p>`;
    }
}
<<<<<<< HEAD

// Dark / Light Mode Toggle
const btn = document.getElementById("toggleMode");

btn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        btn.textContent = "🌙 Dark Mode";
    } else {
        btn.textContent = "☀️ Light Mode";
    }
=======

// -------------------- DARK MODE TOGGLE --------------------
const toggleButton = document.getElementById("toggleMode");

toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    toggleButton.textContent = document.body.classList.contains("light-mode")
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";
>>>>>>> 91debca (updated and user friendly)
});

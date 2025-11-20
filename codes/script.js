function checkPhishing(url) {
    let reasons = [];

    // 1. Suspicious keywords
    const badWords = ["free", "win", "bonus", "money", "gift", "offer"];
    badWords.forEach(word => {
        if (url.toLowerCase().includes(word)) {
            reasons.push(`Contains suspicious keyword: "${word}"`);
        }
    });

    // 2. Very long URL
    if (url.length > 70) {
        reasons.push("URL is unusually long");
    }

    // 3. Contains '@'
    if (url.includes("@")) {
        reasons.push("Contains '@' symbol (used to hide real domain)");
    }

    // 4. No HTTPS
    if (!url.startsWith("https://")) {
        reasons.push("URL is not HTTPS (unsafe)");
    }

    // 5. IP address as domain
    const ipPattern = /https?:\/\/\d{1,3}(\.\d{1,3}){3}/;
    if (ipPattern.test(url)) {
        reasons.push("IP address used instead of domain");
    }

    // 6. Too many subdomains
    const domainParts = url.split(".");
    if (domainParts.length > 4) {
        reasons.push("Too many subdomains (common in phishing)");
    }

    // 7. Suspicious TLDs
    const badTLD = [".xyz", ".click", ".gift", ".top", ".loan", ".work"];
    badTLD.forEach(tld => {
        if (url.endsWith(tld)) {
            reasons.push(`Suspicious domain extension: ${tld}`);
        }
    });

    // 8. Numbers replacing letters
    if (/[a-zA-Z]+\d+[a-zA-Z]+/.test(url)) {
        reasons.push("Domain contains unusual number patterns");
    }

    // 9. Encoding characters
    if (/[%=]/.test(url)) {
        reasons.push("Contains encoded characters (% or =)");
    }

    // 10. Repeated letters
    if (/(.)\1\1/.test(url)) {
        reasons.push("Contains repeated characters (spam pattern)");
    }

    return {
        isPhishing: reasons.length > 0,
        reasons
    };
}

function analyzeURL() {
    const url = document.getElementById("urlInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (url === "") {
        resultDiv.innerHTML = "<p class='danger'>⚠️ Please enter a URL!</p>";
        return;
    }

    const data = checkPhishing(url);

    if (data.isPhishing) {
        resultDiv.innerHTML = `
            <p class='danger'>⚠️ Phishing detected!</p>
            <ul>${data.reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        `;
    } else {
        resultDiv.innerHTML = `<p class='safe'>✔️ URL appears safe!</p>`;
    }
}
// Dark Mode Toggle
document.getElementById("toggleMode").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const btn = document.getElementById("toggleMode");

    if (document.body.classList.contains("light-mode")) {
        btn.textContent = "🌙 Dark Mode";
    } else {
        btn.textContent = "☀️ Light Mode";
    }
});

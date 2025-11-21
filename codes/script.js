function checkPhishing(url) {
    let reasons = [];

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
    const badWords = ["free", "win", "bonus", "money", "gift", "offer"];
    badWords.forEach(word => {
        if (cleanURL.toLowerCase().includes(word)) {
            reasons.push(`Contains suspicious keyword: "${word}"`);
        }
    });

    // 2. Very long URL
    if (cleanURL.length > 70) {
        reasons.push("URL is unusually long");
    }

    // 3. Contains '@'
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
        reasons.push("Contains encoded characters (% or =)");
    }

    // 10. Repeated characters
    if (/(.)\1\1/.test(hostname)) {
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
            <p class='danger'>⚠️ Warning! URL may be dangerous</p>
            <ul>${data.reasons.map(r => `<li>${r}</li>`).join("")}</ul>
        `;
    } else {
        resultDiv.innerHTML = `<p class='safe'>✔️ URL appears safe!</p>`;
    }
}

// Dark / Light Mode Toggle
const btn = document.getElementById("toggleMode");

btn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        btn.textContent = "🌙 Dark Mode";
    } else {
        btn.textContent = "☀️ Light Mode";
    }
});

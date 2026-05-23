const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.getElementById("chat-box");

function addMessage(text, sender) {
    const message = document.createElement("div");

    message.classList.add("message");

    if (sender === "user") {
        message.classList.add("user-message");
    } else {
        message.classList.add("ai-message");
    }

    message.textContent = text;

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function generateResponse(text) {

    const lower = text.toLowerCase();

    if (lower.includes("hi") || lower.includes("hello")) {
        return "Hello. I am A.H. AI.";
    }

    if (lower.includes("joke")) {
        return "Why did the AI go to school? To improve its neural education.";
    }

    try {

        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`
        );

        const data = await response.json();

        if (data.extract) {
            return data.extract;
        } else {
            return "No internet information found.";
        }

    } catch (error) {
        return "Web search failed.";
    }
}

async function sendMessage() {

    const userText = input.value.trim();

    if (!userText) return;

    addMessage(userText, "user");

    input.value = "";

    addMessage("Searching...", "ai");

    const messages = document.querySelectorAll(".ai-message");

    const loadingMessage = messages[messages.length - 1];

    const response = await generateResponse(userText);

    loadingMessage.textContent = response;
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

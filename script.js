async function talkToAI() {

    let input = document.getElementById("userInput").value;

    if (input.trim() === "") {
        return;
    }

    let chatBox = document.getElementById("chatBox");

    // USER MESSAGE

    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = input;

    chatBox.appendChild(userMessage);

    // AI MESSAGE

    let aiMessage = document.createElement("div");
    aiMessage.classList.add("ai-message");
    aiMessage.innerText = "Thinking...";

    chatBox.appendChild(aiMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    // GEMINI API

    const API_KEY = "PASTE_YOUR_API_KEY_HERE";

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: input
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    let aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated.";

    aiMessage.innerText = aiResponse;

    chatBox.scrollTop = chatBox.scrollHeight;

    document.getElementById("userInput").value = "";
}

// ENTER KEY SUPPORT

document.getElementById("userInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        talkToAI();
    }

});

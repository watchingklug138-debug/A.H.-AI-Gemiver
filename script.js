const API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";

async function sendMessage() {

    const input = document.getElementById("user-input");

    const chatBox = document.getElementById("chat-box");

    const text = input.value;

    if (text.trim() === "") return;

    // USER MESSAGE

    const userMessage = document.createElement("div");

    userMessage.className = "message user";

    userMessage.innerText = text;

    chatBox.appendChild(userMessage);

    // AI MESSAGE

    const aiMessage = document.createElement("div");

    aiMessage.className = "message ai";

    aiMessage.innerText = "Thinking...";

    chatBox.appendChild(aiMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
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
                                    text: text
                                }
                            ]
                        }
                    ]

                })

            }
        );

        const data = await response.json();

        const aiText =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response generated.";

        aiMessage.innerText = aiText;

    }

    catch (error) {

        aiMessage.innerText =
            "Error connecting to A.H. AI.";

    }

}

// ENTER KEY SUPPORT

document
.getElementById("user-input")
.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});

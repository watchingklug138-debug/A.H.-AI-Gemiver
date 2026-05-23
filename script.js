function talkToAI() {

    let input = document.getElementById("userInput").value;

    if (input.trim() === "") {
        return;
    }

    let chatBox = document.getElementById("chatBox");

    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = input;

    chatBox.appendChild(userMessage);

    let response = "";

    let lowerInput = input.toLowerCase();

    if (lowerInput.includes("hello")) {
        response = "Hello. I am A.H. AI.";
    }

    else if (lowerInput.includes("who are you")) {
        response = "I am A.H. AI, developed by GEMIVER AI GROUP.";
    }

    else if (lowerInput.includes("math")) {
        response = "I specialize in mathematical calculations and logical reasoning.";
    }

    else if (lowerInput.includes("homework")) {
        response = "I can assist with homework, explanations, and educational support.";
    }

    else if (lowerInput.includes("write")) {
        response = "I can generate stories, essays, scripts, and creative content.";
    }

    else if (lowerInput.includes("data")) {
        response = "I can help analyze and organize structured information.";
    }

    else {
        response = "Processing request: " + input;
    }

    setTimeout(() => {

        let aiMessage = document.createElement("div");
        aiMessage.classList.add("ai-message");
        aiMessage.innerText = response;

        chatBox.appendChild(aiMessage);

        chatBox.scrollTop = chatBox.scrollHeight;

    }, 500);

    document.getElementById("userInput").value = "";
}

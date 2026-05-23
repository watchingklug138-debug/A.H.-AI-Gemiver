function talkToAI() {

    let input = document.getElementById("userInput").value;

    let response = "I am A.H. AI. You said: " + input;

    document.getElementById("response").innerText = response;
}

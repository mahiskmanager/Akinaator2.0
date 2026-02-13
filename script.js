async function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const message = input.value.trim();

    if (!message) return;

    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerText = message;
    chat.appendChild(userMsg);

    input.value = "";

    const loadingMsg = document.createElement("div");
    loadingMsg.className = "message bot";
    loadingMsg.innerText = "Pensando...";
    chat.appendChild(loadingMsg);

    chat.scrollTop = chat.scrollHeight;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        loadingMsg.innerText = data.reply || "Error sin respuesta";

    } catch (error) {
        loadingMsg.innerText = "Error conectando con el servidor.";
    }

    chat.scrollTop = chat.scrollHeight;
}

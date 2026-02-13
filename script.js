
async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");

  if (!input.value) return;

  chat.innerHTML += `<div><strong>Tú:</strong> ${input.value}</div>`;

  const response = await fetch("http://localhost:3000/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input.value })
  });

  const data = await response.json();
  chat.innerHTML += `<div><strong>Akinator 2.0:</strong> ${data.reply}</div>`;
  input.value = "";
}

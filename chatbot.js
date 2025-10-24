const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbox = document.getElementById("chatbox");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const messagesContainer = document.getElementById("chat-messages");

// 🔹 Abrir o cerrar el chatbot
chatbotToggle.addEventListener("click", () => chatbox.classList.toggle("hidden"));
closeChat.addEventListener("click", () => chatbox.classList.add("hidden"));

// 🔹 Enviar mensaje con botón o tecla Enter
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  // Muestra mensaje del usuario
  addMessage("user", userText);
  userInput.value = "";

  // Muestra indicador de escritura del bot
  addMessage("bot", "Escribiendo...");

  try {
    const res = await fetch("https://us-central1-portafolioanthonnyf.cloudfunctions.net/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();
    const botReply = data.message || "No pude responder eso 😅";

    // Reemplaza “Escribiendo...” con la respuesta real
    const lastBotMsg = messagesContainer.lastElementChild;
    if (lastBotMsg.classList.contains("bot-message")) {
      lastBotMsg.textContent = botReply;
    } else {
      addMessage("bot", botReply);
    }
  } catch (error) {
    console.error(error);
    addMessage("bot", "Error al conectar con el servidor 😔");
  }
}

// 🔹 Función para agregar mensajes al contenedor
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "user" ? "user-message" : "bot-message");
  msg.textContent = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

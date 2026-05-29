let totalNewMessage = 1;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateNewMessage(newTexts) {
  const newMessage = document.getElementById("new-message");
  const status = document.getElementById("total-new-message");
  const newText = newTexts.replace("\n", " ");

  newMessage.innerText =
    newText.length > 30 ? newText.slice(0, 30) + "..." : newText;
  status.innerHTML =
    totalNewMessage != 0
      ? `<span class="bg-amber-600 px-2 rounded-full text-sm text-gray-200">${totalNewMessage}</span>`
      : "";
}

function addChat(text, sender = "other", delay = 0) {
  const message = text.replace("\n", "<br>");
  console.log(message);
  const chatContainer = document.getElementById("chatting");
  const now = new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (sender === "me") {
    setTimeout(() => {
      const newMessage = `
            <div
            class="bg-slate-700 w-fit p-4 rounded-b-xl rounded-tl-xl justify-self-end h-fit" id="latest-msg">
            <p class="text-white font-medium">${message}</p>
            <span class="flex w-full text-xs text-gray-400 justify-end">${now}</span>
            </div>
        `;
      const targetScroll = document.getElementById("latest-msg");
      chatContainer.insertAdjacentHTML('beforeend', newMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      targetScroll.removeAttribute("id");
    }, delay);

    totalNewMessage = 0;
  } else {
    chatContainer.innerHTML += `
        <div id="loading"
        class="bg-slate-700 w-fit max-w-[700px] p-4 rounded-b-xl rounded-tr-xl justify-self-start h-fit">
        <p class="text-white text-lg font-black">...</p>
        </div>
    `;
    setTimeout(() => {
      document.getElementById("loading").remove();
      const newMessage = `
                <div
                class="bg-slate-700 w-fit max-w-[700px] break-words p-4 rounded-b-xl rounded-tr-xl justify-self-start h-fit" id="latest-msg">
                <p class="text-white font-medium">${message}</p>
                <span class="flex w-full text-xs text-gray-400 justify-end">${now}</span>
                </div>
            `;
      const targetScroll = document.getElementById("latest-msg");
      chatContainer.insertAdjacentHTML('beforeend', newMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      targetScroll.removeAttribute("id");
      updateNewMessage(text);
    }, delay);
  }
}

async function getChatting(order) {
  const res = await fetch(`/asset/data/message/message${order}.json`);
  const data = await res.json();

  for (const chat of data) {
    addChat(chat.message, chat.sender, chat.delay);
    await wait(chat.delay);
  }
}

function sendMessage() {
  let chatInputValue = document.getElementById("chat-input").value;
  if (!chatInputValue) {
    alert("pesan tidak boleh kosong");
    return;
  }
  addChat(chatInputValue, "me");
  document.getElementById("chat-input").value = "";
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

getChatting(1);

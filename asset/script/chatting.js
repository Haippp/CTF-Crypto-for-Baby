let totalNewMessage = 0
let wrongAnswer = -1
let stage = 1

correct = [
  "df2b8eaef34e55f40e3d7c064714b29e670bb594b7113cc6d429554d55c8e683",
  "c7c9396208275073cba2de8fdb6ca798532a95d617275730e09a7801a89f5324"
]

async function hashing(text){
  const txtBuff = new TextEncoder().encode(text)
  const hshbuff = await crypto.subtle.digest('SHA-256', txtBuff)
  const hshArr = Array.from(new Uint8Array(hshbuff))
  
  return hshArr.map(b => b.toString(16).padStart(2, '0')).join('')
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateNewMessage(newTexts) {
  const newMessage = document.getElementById("new-message");
  const status = document.getElementById("total-new-message");
  const newText = newTexts.replace("\n", " ");

  newMessage.innerText =
    newText.length > 30 ? newText.slice(0, 30) + "..." : newText;
  
  if(totalNewMessage != 0) {
    status.innerHTML = `<span class="bg-amber-600 px-2 rounded-full text-sm text-gray-200">${totalNewMessage}</span>`
  } else {
    status.innerHTML = ""
  }
}

function addChat(text, sender = "other", delay = 0) {
  const message = text.replace("\n", "<br>");
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
      updateNewMessage("")
    }, delay);

    totalNewMessage = 0;
  } else if (sender === "server") {
      setTimeout(() => {
      const newMessage = `
            <div
            class="bg-slate-700 w-fit p-4 rounded-b-xl rounded-tr-xl justify-self-start h-fit" id="latest-msg">
            <p class="text-white font-medium">${message}</p>
            <span class="flex w-full text-xs text-gray-400 justify-end">${now}</span>
            </div>
        `;
      const targetScroll = document.getElementById("latest-msg");
      chatContainer.insertAdjacentHTML('beforeend', newMessage);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      updateNewMessage("img")
    }, delay)
  } else {
    totalNewMessage += 1
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
      updateNewMessage(text);
    }, delay);
  }
}

async function getChatting(order, index = null) {
  const res = await fetch(`/asset/data/message/message${order}.json`);
  const data = await res.json();

  if (index != null) {
    addChat(data[wrongAnswer].message, data[wrongAnswer].sender, data[wrongAnswer].delay)
  } else {
    for (const chat of data) {
      addChat(chat.message, chat.sender, chat.delay);
      await wait(chat.delay);
    }
  }

  if(wrongAnswer >= 4){
    setTimeout(() => window.location.href = '/', 3000)
  }
}

async function sendMessage() {
  let chatInputValue = document.getElementById("chat-input").value;

  if (!chatInputValue) {
    alert("pesan tidak boleh kosong");
    return;
  }
  addChat(chatInputValue, "me");
  document.getElementById("chat-input").value = "";

  if ((await hashing(chatInputValue)) == correct[stage - 1]) { 
    stage += 1
    getChatting(stage)
  } else {
    wrongAnswer += 1
    getChatting(0, wrongAnswer)
  }
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

getChatting(stage);
let totalNewMessage = 1

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

function updateNewMessage(newText){
    const newMessage = document.getElementById('new-message')
    const status = document.getElementById('total-new-message')
    
    newMessage.innerText = newText.length > 30 ? 
        newText.slice(0, 30) + "..." : newText
    status.innerHTML = totalNewMessage != 0 ? 
        `<span class="bg-amber-600 px-2 rounded-full text-sm text-gray-200">${totalNewMessage}</span>` : ''
}

function addChat(text, sender='other', delay=1000){
    const message = text.replace('\n', '<br>')
    console.log(message)
    const chatContainer = document.getElementById('chatting')
    const now = new Date().toLocaleTimeString('id-ID', {
        hour: "2-digit",
        minute: "2-digit"
    })

    if (sender === 'me') {
        setTimeout(() => {
            chatContainer.innerHTML += `
                <div
                class="bg-slate-700 w-fit p-4 rounded-b-xl rounded-tl-xl justify-self-end h-fit">
                <p class="text-white font-medium">${message}</p>
                <span class="flex w-full text-xs text-gray-400 justify-end">${now}</span>
                </div>
            `
        }, delay)
        totalNewMessage = 0
    } else {
        chatContainer.innerHTML += `
            <div id="loading"
            class="bg-slate-700 w-fit p-4 rounded-b-xl rounded-tr-xl justify-self-start h-fit">
            <p class="text-white text-lg font-black">...</p>
            </div>
        `
        setTimeout(() => {
            document.getElementById("loading").remove()
            chatContainer.innerHTML += `
                <div
                class="bg-slate-700 w-fit p-4 rounded-b-xl rounded-tr-xl justify-self-start h-fit">
                <p class="text-white font-medium">${message}</p>
                <span class="flex w-full text-xs text-gray-400 justify-end">${now}</span>
                </div>
            `
        }, delay)
    }

    updateNewMessage(text)
}

async function getChatting(order){
    const res = await fetch(`/asset/data/message/message${order}.json`)
    const data = await res.json()

    for (const chat of data) {
        addChat(chat.message, chat.sender, chat.delay)
        await wait(chat.delay)
    }
}
getChatting(1)
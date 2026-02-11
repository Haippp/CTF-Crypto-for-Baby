let level = Number(localStorage.getItem('level')) ? Number(localStorage.getItem('level')) : 1
const title = document.getElementById('title')
const desc = document.getElementById('description')
const ct = document.getElementById('ciphertext')
const userInput = document.getElementById('answer')
let oldLevel = level

document.getElementById('answer').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      checkAnswer()
    }
})

function getData(lvl) {
    return fetch('./content.json').then(res => res.json())
    .then(data => data[`${lvl}`]).catch(error => console.log(error))
}

async function sha256(text) {
    const encode = new TextEncoder()
    const data = encode.encode(text)

    const hashBuff = await crypto.subtle.digest('SHA-256', data)
    const hashArr = Array.from(new Uint8Array(hashBuff))
    const hashHex = hashArr
    .map(b => b.toString(16).padStart(2, 0))
    .join('')
    return hashHex
}

function loadLevel(){
    if (level <= 5){
        getData(level).then(data => {
        title.innerText = data.title
        desc.innerText = data.desc
        ct.innerText = data.cipher
        })
    } else 
        level = 1
    document.title = `Level ${level}`
    localStorage.setItem('level', level)
}

function showModal() {
  document.getElementById('finishModal').classList.remove('hidden')
}

function closeModal() {
  document.getElementById('finishModal').classList.add('hidden')
  window.location.assign('../')
}

function checkAnswer() {
    const alert = document.getElementById('alert')
    sha256(userInput.value).then(hex => {
        getData(level).then(data => hex == data.correct)
        .then(isCorrect => {
            alert.classList.remove('hidden')
            userInput.value = ''
            if(isCorrect){
                level++
                alert.innerHTML = 'Jawaban anda benar!'
                alert.className = 'mt-3 rounded-md bg-green-100 text-green-800 px-4 py-2 text-sm text-center'
                setTimeout(()=> alert.classList.add('hidden'), 2000)
                if (level === 6){
                    showModal()
                }
                loadLevel()
            } else {
                alert.innerHTML = 'Jawaban anda salah!'
                alert.className = 'mt-3 rounded-md bg-red-100 text-red-800 px-4 py-2 text-sm text-center'
                setTimeout(()=> alert.classList.add('hidden'), 2000)
            }
        })
    })
}

async function copyClipboard() {
    const button = document.getElementById("salin")
    await navigator.clipboard.writeText(ct.innerText)
    button.classList.replace("bg-blue-500", "bg-green-500")
    setTimeout(() => button.classList.replace("bg-green-500", "bg-blue-500"), 700)
}


if((oldLevel + 1) == level || oldLevel == level) loadLevel()
else{
    alert("Jangan curang ya brokk")
    localStorage.setItem("level", 1)
    level = 1
    loadLevel()
}
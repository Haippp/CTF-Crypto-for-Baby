
let level = Number(localStorage.getItem('level')) ? Number(localStorage.getItem('level')) : 1
const title = document.getElementById('title')
const desc = document.getElementById('description')
const ct = document.getElementById('ciphertext')
const userInput = document.getElementById('answer')

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
    getData(level).then(data => {
    title.innerText = data.title
    desc.innerText = data.desc
    ct.innerText = data.cipher
})
document.title = `Level ${level}`
localStorage.setItem('level', level)
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
                loadLevel()
                alert.innerHTML = 'Jawaban anda benar!'
                alert.className = 'mt-3 rounded-md bg-green-100 text-green-800 px-4 py-2 text-sm text-center'
            } else {
                alert.innerHTML = 'Jawaban anda salah!'
                alert.className = 'mt-3 rounded-md bg-red-100 text-red-800 px-4 py-2 text-sm text-center'
                
            }
            setTimeout(()=> alert.classList.add('hidden'), 1000)
        })
    })
}

loadLevel()
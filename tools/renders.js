const tools = document.getElementById('tools-section')
const enc = [
    "Base64 Encoding", 
    "Base64 Decoding", 
    "Hex Encoding", 
    "Hex Decoding", 
    "Xor"
]

const basicInput = `
    <div>
        <label for="input">Input</label><br>
        <textarea type="text" id="text-input" class="w-full h-[200px] p-2 border border-slate-300 outline-blue-200 rounded-lg resize-none bg-slate-100 text-black"></textarea>
    </div>
    <div>
        <label for="output">Output</label><br>
        <textarea type="text" id="output" class="w-full h-[200px] p-2 border border-slate-300 outline-blue-200 rounded-lg resize-none bg-slate-100 text-black"></textarea>
    </div>
`

function renderFeature(){
    const feature = document.getElementById("feature")
    enc.forEach(encType => {
        feature.innerHTML += `
        <div class="border-b border-slate-800 mx-5 py-2 hover:bg-slate-100/20">
            <button onclick="renderTools('${encType}')" class="w-full text-left cursor-pointer hover:font-medium">${encType}</button>
        </div>
        `
    })
}

function renderTools(encType = 'Base64 Encoding') {
    const title = `<h1 class="text-3xl font-bold col-span-2">${encType}</h1>`
    const button = `<button type="button" onclick="process('${encType}')" class="bg-emerald-950 p-2 cursor-not-alowed w-[200px] rounded-md" id="process" disabled>process</button>`
    
    switch (encType) {
        case 'Xor':
            tools.innerHTML = title
            tools.innerHTML += `<h1 class="text-3xl font-bold col-span-2">Cooming Soon...</h1>`
            break;
        default:
            tools.innerHTML = title
            tools.innerHTML += basicInput 
            tools.innerHTML += button
            break;
    }
}

renderFeature()
renderTools()
const enc = [
    "Base64 Encoding", 
    "Base64 Decoding", 
    "Hex Encoding", 
    "Hex Decoding", 
    "Xor"
]

function renderFeature(){
    const feature = document.getElementById("feature")
    enc.forEach(encType => {
        feature.innerHTML += `
        <div class="border-b border-slate-300 mx-5 py-2 hover:bg-slate-100">
            <button onclick="process('${encType}')" class="w-full text-left cursor-pointer hover:font-medium">${encType}</button>
        </div>
        `
    })
}

renderFeature()
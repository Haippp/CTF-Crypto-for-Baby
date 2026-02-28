import {b64enc, b64dec} from '../asset/script/encoding/base64.mjs'
import { str2hex, hex2str } from '../asset/script/encoding/hex.mjs'
import xor from '../asset/script/encryption/xor.mjs'

const tools = document.getElementById('tools-section')

tools.addEventListener("input", (e) => {
    if(e.target.id === 'text-input'){
        const text = document.getElementById("text-input")
        const btn = document.getElementById("process")
        
        let isEmpty = text.value.trim() === ''

        btn.disabled = isEmpty
        btn.classList.toggle("bg-emerald-700", !isEmpty)
        btn.classList.toggle("hover:bg-emerald-800", !isEmpty)
        btn.classList.toggle("cursor-pointer", !isEmpty)
        btn.classList.toggle("bg-emerald-950", isEmpty)
        btn.classList.toggle("cursor-not-alowed", isEmpty)

        const result = document.getElementById("output")
        if(isEmpty) result.value = ''
    }
})

function process(encType) {
    const result = document.getElementById("output")
    const text = document.getElementById("text-input")
    console.log(text.value)
    console.log('Klikk')
    switch (encType) {
        case 'Base64 Encoding':
            result.value = b64enc(text.value)
            break
        case 'Base64 Decoding':
            result.value = b64dec(text.value)
            break
        case 'Hex Encoding':
            result.value = str2hex(text.value)
            break
        case 'Hex Decoding':
            result.value = hex2str(text.value)
            break
        default:
            break;
    }
}

window.process = process
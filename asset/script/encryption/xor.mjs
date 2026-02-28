export default function xor(key, text, outputOption = '') {
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i)
        const charKey = key.charCodeAt(i % key.length)

        output.push(char ^ charKey)
    }

    switch (outputOption) {
        case 'toHex':
            return output.map(d => 
                d.toString(16).padStart(2, 0)
            ).join('')
        default:
            return String.fromCharCode(...output)
    }
}

export function str2hex(text) {
    const encTxt = new TextEncoder().encode(text)

    return Array.from(encTxt)
    .map((b) => b.toString(16).padStart(2, 0))
    .join('')
}

export function hex2str(hex) {
    const bytes = new Uint8Array(
        hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16))
    )

    const decoder = new TextDecoder()
    return decoder.decode(bytes)
}
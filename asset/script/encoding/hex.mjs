export function str2hex(text) {
    return Buffer.from(text).toString('hex')
}

export function hex2str(hex){
    return Buffer.from(hex, 'hex').toString()
}   
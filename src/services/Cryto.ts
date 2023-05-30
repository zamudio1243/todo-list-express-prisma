import CryptoJS from "crypto-js"

export const encryptPass = (password: string): string =>
    CryptoJS.MD5(password).toString()
export const isValidPass = (password: string, hash: string): boolean =>
    CryptoJS.MD5(password).toString() === hash

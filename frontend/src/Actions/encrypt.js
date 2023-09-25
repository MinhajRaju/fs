import {AES, enc}from 'crypto-js';



export const setEncrypt = (obj , secrectkey , setItemName) =>{


    const envrypted = AES.encrypt(JSON.stringify(obj),secrectkey).toString();
    return localStorage.setItem(setItemName, envrypted.toString())

}



export const getDencrypt = (getItemName , secrectkey ) =>{


    return  JSON.parse(AES.decrypt(localStorage.getItem(getItemName), secrectkey).toString(enc.Utf8));



}


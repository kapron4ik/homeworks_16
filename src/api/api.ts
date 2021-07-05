import axios from "axios";
import {useSelector} from "react-redux";
import { TokenType } from "../redux/recoveryPass-reducer";
import {AppStateType} from "../redux/store";
import {CardReqType, CardsReqType, NewPackType, PacksReqType, PacksType} from "../types/entities";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const authAPI = {
    me() {
        return instance.post('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/me')
    },
    register(email: string, password: string) {
        return instance.post('/auth/register', {email, password})
    },
    recoveryPass(email: string) {
        return instance.post<ResponseType>('auth/forgot', {
            email: email,
            message:
                `<div style="background-color: lime; padding: 15px"> +
                password recovery link:
                <a href='http://localhost:3000/#/enter_new_password/$token$'>link</a></div>`//Поменять на сервер
        });
    },
    setNewPass(password: string, resetPasswordToken: TokenType) {
        return instance.post<ResponseType>('set-new-password', {
            password,
            resetPasswordToken});
    }
}

// const cardsPack = {
//     name: "My new cards pack",
//     path: "/def",
//     grade: 0,
//     shots: 0,
//     rating: 0,
//     deckCover: "url or base64",
//     private: false,
//     type: "pack"
// }

export const packsAPI = {
    getPacks(data:PacksReqType) {
        return instance.get( '/cards/pack', {params:{...data}})
    },
    addPack(data:NewPackType) {
        return instance.post('/cards/pack', {cardsPack:{...data}})
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(id: string, newNamePack: string) {
        return instance.put('/cards/pack', {
            cardsPack: {
                _id: id,
                name: newNamePack
            }
        })
    }
}

export const cardsAPI = {

    getCards(data:CardsReqType){
        return instance.get( '/cards/card', {params:{...data}})
    },
    addCards(data:CardReqType){
        return instance.post('/cards/card', {card:{...data}})
    },
    deleteCards(id:string){
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCards(data:CardReqType){
        return instance.put('/cards/card', {card:{...data}})
    },
    updateGrade (grade: number, cardId: string){
        return instance.put('/cards/grade', {grade, card_id:cardId})
    }
}


// Types
// type PacksTypes = {
//
// }

type ResponseType = {
    info: string
    error: string
}

export enum ResultCodeStatuses {
    Success = 0,
    Error = 1,
    Captcha = 10
}
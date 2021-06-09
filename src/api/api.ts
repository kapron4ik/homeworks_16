import axios from "axios";
import {useSelector} from "react-redux";
import { TokenType } from "../redux/recoveryPass-reducer";
import {AppStateType} from "../redux/store";
import {CardReqType, NewPackType, PacksReqType, PacksType} from "../types/entities";

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
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

const cardsPack = {
    name: "My new cards pack",
    path: "/def",
    grade: 0,
    shots: 0,
    rating: 0,
    deckCover: "url or base64",
    private: false,
    type: "pack"
}

export const packsAPI = {
    // getPacks(page: number = 1, pageSize: number = 20, user_id?:string) {
    getPacks(data:PacksReqType) {
        // return instance.get(`/cards/pack?page=${page}&pageCount=${pageSize}`)
        // return instance.get( '/cards/pack', {params:{page:page,pageCount:pageSize,user_id:user_id}})
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
    // getCards(page:number, pageSize:number, cardsPack_id:string){
    //     // return instance.get( `/cards/card?cardsPack_id=${cardsPack_id}&page=${page}&pageCount=${pageSize}`)
    //     return instance.get( '/cards/card', {params:{cardsPack_id:cardsPack_id,page:page,pageCount:pageSize}})
    // },
    getCards(data:CardReqType){
        // return instance.get( `/cards/card?cardsPack_id=${cardsPack_id}&page=${page}&pageCount=${pageSize}`)
        return instance.get( '/cards/card', {params:{...data}})
    },
    addCards(cardsPack_id:string){
        return instance.post('/cards/card', {card:{
                cardsPack_id: cardsPack_id
            }})
    },
    deleteCards(id:string){
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCards(id:string){
        return instance.put('/cards/card', {card:{
                _id: id,
                question:'new question',
                answer:'new answer'
            }})
    }
}




// Types
type PacksTypes = {

}

type ResponseType = {
    info: string
    error: string
}

export enum ResultCodeStatuses {
    Success = 0,
    Error = 1,
    Captcha = 10
}
import {setAuthUserDataAC, setErrorAC, setIsLoadingAC} from "../redux/auth-reducer";
import {setCards, setCurrentPageCards, setTotalCardsCount} from "../redux/cards-reducer";
import {resetDataCards, setDataCards } from "../redux/cards-request-reducer";
import {setCardPacks, setCurrentPage, setTotalCardPacksCount} from "../redux/packs-reducer";
import {resetDataPack, setDataPack, setIsMyPack} from "../redux/packs-request-reducer";
import {recoveryPasAC, setStatusAC} from "../redux/recoveryPass-reducer";


export type DispathActionType = ReturnType<typeof setAuthUserDataAC> |
    ReturnType<typeof setErrorAC> |
    ReturnType<typeof setCardPacks> |
    ReturnType<typeof setTotalCardPacksCount> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setCards> |
    ReturnType<typeof setTotalCardsCount> |
    ReturnType<typeof setCurrentPageCards> |
    ReturnType<typeof setIsMyPack> |
    ReturnType<typeof setDataPack> |
    ReturnType<typeof setIsLoadingAC> |
    ReturnType<typeof resetDataPack> |
    ReturnType<typeof setDataCards> |
    ReturnType<typeof resetDataCards>|
    ReturnType<typeof recoveryPasAC>|
    ReturnType<typeof setStatusAC>|
    ReturnType<typeof setErrorAC>

//PacksReqType /1 VV
//PacksResType => PacksType /2
//PackReqType => NewPackType /3
//PackResType => CardsType /4
//CardsReqType /5 VV
//CardsResType /6 VV
//CardReqType  /7 VV
//CardResType  /8 VV

export type PacksReqType = { //1
    packName?: string
    min?: number
    max?: number
    sortPacks?: any // Исправить
    page?: number
    pageCount?: number
    user_id?: string
    isMyPacks?: boolean
}

export type PacksType = { //2
    cardPacks?: Array<CardsType>
    cardPacksTotalCount?: number
    maxCardsCount?: number
    minCardsCount?: number
    page?: number
    pageCount?: number
    isMyPacks?: boolean
    user_id?: string
}

export type NewPackType = { //3
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type CardsType = { //4
    _id?: string
    user_id?: string
    name?: string
    path?: string
    cardsCount?: number
    grade?: number
    shots?: number
    rating?: number
    type?: string
    created?: string
    updated?: string
    __v?: number
}

export type CardsReqType = { //5
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?:number
    max?:number
    sortCards?:string //0grade
    page?:number
    pageCount?:number
}

export type CardsResType = {//6
    cards: Array<CardResType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardReqType = { //7
    _id?: string
    question: string
    answer: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}

export type CardResType = { //8
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}


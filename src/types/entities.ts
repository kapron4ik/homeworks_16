import {setAuthUserDataAC, setErrorAC, setIsLoadingAC} from "../redux/auth-reducer";
import {setCards, setCurrentPageCards, setTotalCardsCount} from "../redux/card-reducer";
import {resetDataCard, setDataCard } from "../redux/card-request-reducer";
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
    ReturnType<typeof setDataCard> |
    ReturnType<typeof resetDataCard>|
    ReturnType<typeof recoveryPasAC>|
    ReturnType<typeof setStatusAC>|
    ReturnType<typeof setErrorAC>

export type CardsType = {
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

export type PacksType = {
    cardPacks?: Array<CardsType>
    cardPacksTotalCount?: number
    maxCardsCount?: number
    minCardsCount?: number
    page?: number
    pageCount?: number
    isMyPacks?: boolean
    user_id?: string
}

export type PacksReqType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: any // Исправить
    page?: number
    pageCount?: number
    user_id?: string
    isMyPacks?: boolean
}

export type NewPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type CardResType = {
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

export type CardReqType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?:number
    max?:number
    sortCards?:string //0grade
    page?:number
    pageCount?:number
}
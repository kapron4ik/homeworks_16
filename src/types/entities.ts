import {setAuthUserDataAC, setErrorAC} from "../redux/auth-reducer";
import {setCards, setCurrentPageCards, setTotalCardsCount} from "../redux/card-reducer";
import {setCardPacks, setCurrentPage, setIsMyPack, setTotalCardPacksCount} from "../redux/packs-reducer";
import {setDataPack} from "../redux/packs-request-reducer";


export type DispathActionType = ReturnType<typeof setAuthUserDataAC> |
    ReturnType<typeof setErrorAC> |
    ReturnType<typeof setCardPacks> |
    ReturnType<typeof setTotalCardPacksCount> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setCards> |
    ReturnType<typeof setTotalCardsCount> |
    ReturnType<typeof setCurrentPageCards> |
    ReturnType<typeof setIsMyPack> |
    ReturnType<typeof setDataPack>

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
}
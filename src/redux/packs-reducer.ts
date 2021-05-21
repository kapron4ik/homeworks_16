import {DispathActionType} from "../types/entities";
import {packsAPI} from "../api/api";
import {Dispatch} from "redux";


const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 14,//totalUsersCount
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1, //currentPage
    pageCount: 40, //pagesSize
    isMyPacks: false,
    user_id: ''
}

export const packsReducer = (state: CardPacksPageType = initialState, action: DispathActionType): CardPacksPageType => {
    switch (action.type) {
        case "cardPacks/SET_CARD_PACKS":
            return {...state, cardPacks: action.cardPacks} //[...action.cardPacks]
        case "cardPacks/SET_TOTAL_CARD_PACKS_COUNT":
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case "cardPacks/SET_CURRENT_PAGE":
            return {...state, page: action.currentPage}
        case "cardPacks/SET_IS_MY_PACK":
            return {...state, isMyPacks:!state.isMyPacks}
        default:
            return state
    }
}

export const setCardPacks = (cardPacks: Array<CardPacksType>) => {
    return {
        type: "cardPacks/SET_CARD_PACKS",
        cardPacks
    } as const
}

export const setTotalCardPacksCount = (cardPacksTotalCount: number) => {
    return {
        type: "cardPacks/SET_TOTAL_CARD_PACKS_COUNT",
        cardPacksTotalCount
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: "cardPacks/SET_CURRENT_PAGE",
        currentPage
    } as const
}

export const setIsMyPack = () => {
    return {
        type: "cardPacks/SET_IS_MY_PACK",
    }  as const
}

//Thunk
export const getPacksTC = (page: number, pageSize: number, user_id?:string) => (dispatch: Dispatch<DispathActionType>) => {
    packsAPI.getPacks(page, pageSize, user_id)
        .then((res) => {
            dispatch(setCardPacks(res.data.cardPacks))
            dispatch(setCurrentPage(res.data.page))
            dispatch(setTotalCardPacksCount(res.data.cardPacksTotalCount))
        })
}

export const addCardsPack = () => (dispatch: (getCardPacks: (dispatch: Dispatch<DispathActionType>) => void) => void) => {
    packsAPI.addPack()
        .then(() => {
            dispatch(getPacksTC(initialState.page, initialState.pageCount, initialState.user_id))
            // dispatch(setCardPacks(res.data.cardPacks))
            // dispatch(setTotalCardPacksCount(res.data.cardPacksTotalCount))
        })
}

export const deleteCardsPack = (id: string) => (dispatch: (getCardPacks: (dispatch: Dispatch<DispathActionType>) => void) => void) => {
    packsAPI.deletePack(id)
        .then(() => {
            dispatch(getPacksTC(initialState.page, initialState.pageCount,initialState.user_id))
        })
}

export const updateCardsPack = (id: string) => (dispatch: (getCardPacks: (dispatch: Dispatch<DispathActionType>) => void) => void) => {
    packsAPI.updatePack(id)
        .then(() => {
            dispatch(getPacksTC(initialState.page, initialState.pageCount,initialState.user_id))
        })
}

//Types
export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}

export type CardPacksPageType = {
    cardPacks: Array<CardPacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    isMyPacks?: boolean
    user_id?: string
}


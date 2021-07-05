import {CardsType, DispathActionType, NewPackType, PacksReqType, PacksType} from "../types/entities";
import {packsAPI} from "../api/api";
import {Dispatch} from "redux";
import {setIsLoadingAC} from "./auth-reducer";
import {getPacksReqTC} from "./packs-request-reducer";
import {AppStateType} from "./store";


const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 14,//totalUsersCount
    maxCardsCount: 6,
    minCardsCount: 0,
    page: 1, //currentPage
    pageCount: 20, //pagesSize
    isMyPacks: false,
    user_id: ''
}

export const packsReducer = (state: PacksType = initialState, action: DispathActionType): PacksType => {
    switch (action.type) {
        case "packs/SET_CARD_PACKS":
            return {...state, cardPacks: action.cardPacks} //[...action.cardPacks]
        case "packs/SET_TOTAL_CARD_PACKS_COUNT":
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case "packs/SET_CURRENT_PAGE":
            return {...state, page: action.currentPage}
        // case "packs/SET_DATA_PACKS":
        //     return  {}
        default:
            return state
    }
}

export const setCardPacks = (cardPacks: Array<CardsType>) => {
    return {
        type: "packs/SET_CARD_PACKS",
        cardPacks
    } as const
}

export const setTotalCardPacksCount = (cardPacksTotalCount: number) => {
    return {
        type: "packs/SET_TOTAL_CARD_PACKS_COUNT",
        cardPacksTotalCount
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: "packs/SET_CURRENT_PAGE",
        currentPage
    } as const
}

// export const setDataPack = (data:PacksReqType) => {
//     return{
//         type: "packs/SET_DATA_PACKS"
//     } as const
// }

//Thunk
// export const getPacksTC = (page: number, pageCount: number, user_id:string) => (dispatch: Dispatch<DispathActionType>) => {
//     packsAPI.getPacks({page, pageCount, user_id})
export const getPacksTC = (data:PacksReqType) => (dispatch: Dispatch<DispathActionType>) => {

    packsAPI.getPacks({...data})
        .then((res) => {
            dispatch(setCardPacks(res.data.cardPacks))
            dispatch(setCurrentPage(res.data.page))
            dispatch(setTotalCardPacksCount(res.data.cardPacksTotalCount))
        })
}

export const addCardsPack = (data:NewPackType) => (dispatch: (getPacksReqTC: (dispatch: Dispatch<DispathActionType>,getState:()=>AppStateType) => void) => void & Dispatch<DispathActionType>) => {
    packsAPI.addPack({...data})
        .then(() => {
            dispatch(getPacksReqTC({}))
            // dispatch(setCardPacks(res.data.cardPacks))
            // dispatch(setTotalCardPacksCount(res.data.cardPacksTotalCount))
        })
}

export const deleteCardsPack = (id: string) => (dispatch: (getPacksReqTC: (dispatch: Dispatch<DispathActionType>, getState:()=>AppStateType) => void) => void) => {
    packsAPI.deletePack(id)
        .then(() => {
            dispatch(getPacksReqTC({}))
        })
}

export const updateCardsPack = (id: string,newNamePack: string) => (dispatch: (getPacksReqTC: (dispatch: Dispatch<DispathActionType>,getState:()=>AppStateType) => void) => void) => {
    packsAPI.updatePack(id, newNamePack)
        .then(() => {
            dispatch(getPacksReqTC({}))
        })
}

//Types
// export type CardPacksType = {
//     _id: string
//     user_id: string
//     name: string
//     path: string
//     cardsCount: number
//     grade: number
//     shots: number
//     rating: number
//     type: string
//     created: string
//     updated: string
//     __v: number
// }
//
// export type CardPacksPageType = {
//     cardPacks: Array<CardPacksType>
//     cardPacksTotalCount: number
//     maxCardsCount: number
//     minCardsCount: number
//     page: number
//     pageCount: number
//     isMyPacks?: boolean
//     user_id?: string
// }


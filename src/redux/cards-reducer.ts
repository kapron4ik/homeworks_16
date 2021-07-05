import {CardReqType, DispathActionType} from "../types/entities";
import {cardsAPI, packsAPI} from "../api/api";
import {Dispatch} from "redux";
import { getCardsReqTC } from "./cards-request-reducer";
import {AppStateType} from "./store";


const initialState = {
    cards: [],
    cardsTotalCount: 18,
    maxGrade: 5,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 10,
    packUserId: "5eecf82a3ed8f700042f1186"
}

export const cardsReducer = (state: CardsPageType = initialState, action: DispathActionType): CardsPageType => {
    switch (action.type) {
        case "cards/SET_CARDS":
            return {...state, cards: action.cards}
        case "cards/SET_TOTAL_CARDS_COUNT":
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "cards/SET_CURRENT_PAGE":
            return {...state, page: action.currentPage}
        default:
            return state
    }
}

export const setCards = (cards: Array<CardsType>) => {
    return {
        type: "cards/SET_CARDS",
        cards
    } as const
}

export const setTotalCardsCount = (cardsTotalCount: number) => {
    return {
        type: "cards/SET_TOTAL_CARDS_COUNT",
        cardsTotalCount
    } as const
}

export const setCurrentPageCards = (currentPage: number) => {
    return {
        type: "cards/SET_CURRENT_PAGE",
        currentPage
    } as const
}

//Thunk
// export const getCards = (page:number, pageSize:number, cardsPack_id:string) => (dispatch: Dispatch<DispathActionType>) => {
//     cardsAPI.getCards(page, pageSize, cardsPack_id)
//         .then((res) => {
//             dispatch(setCards(res.data.cards))
//             dispatch(setCurrentPageCards(res.data.page))
//             dispatch(setTotalCardsCount(res.data.pageCount))
//         })
// }

export const addCard = (data:CardReqType) => (dispatch: (getCardsReqTC: (dispatch: Dispatch<DispathActionType>,getState:()=>AppStateType) => void) => void & Dispatch<DispathActionType>) => {
    cardsAPI.addCards(data)
        .then(()=>{
            // dispatch(getCards(initialState.page,initialState.pageCount,cardsPack_id))
            dispatch(getCardsReqTC({}))

        })
}

export const deleteCard = (id:string,cardsPack_id:string) => (dispatch: (getCardsReqTC: (dispatch: Dispatch<DispathActionType>,getState:()=>AppStateType) => void) => void) => {
    cardsAPI.deleteCards(id)
        .then(()=>{
            // dispatch(getCards(initialState.page,initialState.pageCount,cardsPack_id))
            dispatch(getCardsReqTC({}))
        })
}

export const updateCard = (data:CardReqType) => (dispatch: (getCardsReqTC: (dispatch: Dispatch<DispathActionType>,getState:()=>AppStateType) => void) => void) => {
    cardsAPI.updateCards(data)
        .then(()=>{
            // dispatch(getCards(initialState.page,initialState.pageCount,cardsPack_id))
            dispatch(getCardsReqTC({}))
        })
}

export const updateGrade = (grade: number, cardId: string) => (dispatch: (getCardsReqTC: (dispatch: Dispatch<DispathActionType>,getState:()=>AppStateType) => void) => void) => {
    cardsAPI.updateGrade(grade, cardId)
        .then(()=>{
            dispatch(getCardsReqTC({}))
        })
}

//Types
export type CardsType = {
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

export type CardsPageType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

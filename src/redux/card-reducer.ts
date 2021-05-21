import {DispathActionType} from "../types/entities";
import {cardsAPI, packsAPI} from "../api/api";
import {Dispatch} from "redux";


const initialState = {
    cards: [],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
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
export const getCards = (page:number, pageSize:number, cardsPack_id:string) => (dispatch: Dispatch<DispathActionType>) => {
    cardsAPI.getCards(page, pageSize, cardsPack_id)
        .then((res) => {
            dispatch(setCards(res.data.cards))
            dispatch(setCurrentPageCards(res.data.page))
            dispatch(setTotalCardsCount(res.data.pageCount))
        })
}

export const addCard = (cardsPack_id:string) => (dispatch: (getCardPacks: (dispatch: Dispatch<DispathActionType>) => void) => void) => {
    cardsAPI.addCards(cardsPack_id)
        .then(()=>{
            dispatch(getCards(initialState.page,initialState.pageCount,cardsPack_id))

        })
}

export const deleteCard = (id:string,cardsPack_id:string) => (dispatch: (getCardPacks: (dispatch: Dispatch<DispathActionType>) => void) => void) => {
    cardsAPI.deleteCards(id)
        .then(()=>{
            dispatch(getCards(initialState.page,initialState.pageCount,cardsPack_id))
        })
}

export const updateCard = (id:string, cardsPack_id:string) => (dispatch: (getCardPacks: (dispatch: Dispatch<DispathActionType>) => void) => void) => {
    cardsAPI.updateCards(id)
        .then(()=>{
            dispatch(getCards(initialState.page,initialState.pageCount,cardsPack_id))
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

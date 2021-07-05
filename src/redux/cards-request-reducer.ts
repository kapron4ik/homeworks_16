import {CardsReqType, CardsResType, DispathActionType} from "../types/entities";
import {cardsAPI} from "../api/api";
import {Dispatch} from "redux";
import {setIsLoadingAC} from "./auth-reducer";
import {AppStateType} from "./store";
import {setCards, setCurrentPageCards, setTotalCardsCount} from "./cards-reducer";
import { AxiosResponse } from "axios";


const initialState = {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 4,
    sortCards: '0grade', //0grade
    page: 1,
    pageCount: 7
}

export const cardsReqReducer = (state: CardsReqType = initialState, action: DispathActionType): CardsReqType => {
    switch (action.type) {
        case "card-req/SET_DATA_CARDS":
            return {...state, ...action.data}
        case "card-req/RESET_DATA_CARDS":
            return {
                cardAnswer: '',
                cardQuestion: '',
                cardsPack_id: '',
                min: 1,
                max: 4,
                sortCards: '',
                page: 2,
                pageCount: 8
            }
        default:
            return state
    }
}

export const setDataCards = (data: CardsReqType) => {
    return {
        type: "card-req/SET_DATA_CARDS",
        data
    } as const
}

export const resetDataCards = () => {
    return {
        type: "card-req/RESET_DATA_CARDS",
    } as const
}

//Thunk
export const getCardsReqTC = (data: CardsReqType) => (dispatch: Dispatch<DispathActionType>, getState: () => AppStateType) => {
    const state = getState().cardsReq
    // dispatch(setIsLoadingAC(true))
    dispatch(setDataCards(data))
    cardsAPI.getCards({...state, ...data})
        .then((res:AxiosResponse<CardsResType>) => {
            dispatch(setCards(res.data.cards))
            dispatch(setCurrentPageCards(res.data.page))
            dispatch(setTotalCardsCount(res.data.cardsTotalCount))
            // dispatch(setIsLoadingAC(false))
        })
}




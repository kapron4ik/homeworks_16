import {CardReqType, DispathActionType} from "../types/entities";
import {cardsAPI, packsAPI} from "../api/api";
import {Dispatch} from "redux";
import {setIsLoadingAC} from "./auth-reducer";
import {AppStateType} from "./store";
import {setCards, setCurrentPageCards, setTotalCardsCount} from "./card-reducer";


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

export const cardReqReducer = (state: CardReqType = initialState, action: DispathActionType): CardReqType => {
    switch (action.type) {
        case "card-req/SET_DATA_CARD":
            return {...state, ...action.data}
        case "card-req/RESET_DATA_CARD":
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
        // case "packs-req/SET_IS_MY_PACK":
        //     return {...state, isMyPacks: action.checked, user_id:action.userId }
        default:
            return state
    }
}

export const setDataCard = (data: CardReqType) => {
    return {
        type: "card-req/SET_DATA_CARD",
        data
    } as const
}

export const resetDataCard = () => {
    return {
        type: "card-req/RESET_DATA_CARD",
    } as const
}

// export const setIsMyPack = (checked:boolean, userId: string) => {
//     return {
//         type: "packs-req/SET_IS_MY_PACK",
//         checked,
//         userId
//     } as const
// }

//Thunk
export const getCardReqTC = (data: CardReqType) => (dispatch: Dispatch<DispathActionType>, getState: () => AppStateType) => {
    const state = getState().cardReq
    // dispatch(setIsLoadingAC(true))
    // cardsAPI.getCards({...data})
    cardsAPI.getCards({...state, ...data})
        .then((res) => {
            dispatch(setCards(res.data.cards))
            dispatch(setCurrentPageCards(res.data.page))
            dispatch(setTotalCardsCount(res.data.pageCount))
            // dispatch(setIsLoadingAC(false))

        })
}




import {DispathActionType, PacksReqType, PacksType} from "../types/entities";
import {packsAPI} from "../api/api";
import {Dispatch} from "redux";
import {setCardPacks, setCurrentPage, setTotalCardPacksCount} from "./packs-reducer";
import {setIsLoadingAC} from "./auth-reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "./store";


const initialState = {
    packName: '',
    min: 0,
    max: 40,
    sortPacks: 0,
    page: 1,
    pageCount: 40,
    user_id: '',
    isMyPacks: false
}

export const packsReqReducer = (state: PacksReqType = initialState, action: DispathActionType): PacksReqType => {
    switch (action.type) {
        case "packs-req/SET_DATA_PACKS":
            return {...state, ...action.data}
        case "packs-req/RESET_DATA_PACKS":
            return {
                packName: '',
                min: 0,
                max: 40,
                sortPacks: 0,
                page: 1,
                pageCount: 40,
                isMyPacks: false,
                user_id: ''
            }
        case "packs-req/SET_IS_MY_PACK":
            return {...state, isMyPacks: action.checked, user_id:action.userId }
        default:
            return state
    }
}

export const setDataPack = (data: PacksReqType) => {
    return {
        type: "packs-req/SET_DATA_PACKS",
        data
    } as const
}

export const resetDataPack = () => {
    return {
        type: "packs-req/RESET_DATA_PACKS",
    } as const
}

export const setIsMyPack = (checked:boolean, userId: string) => {
    return {
        type: "packs-req/SET_IS_MY_PACK",
        checked,
        userId
    } as const
}

//Thunk
export const getPacksReqTC = (data: PacksReqType) => (dispatch: Dispatch<DispathActionType>, getState:()=>AppStateType) => {
    dispatch(setDataPack(data))
   const state  = getState().packsReq
    dispatch(setIsLoadingAC(true))
    // const userId = initialState.isMyPacks?initialState.user_id:''
    // packsAPI.getPacks({...initialState, ...data, user_id:userId})
    // packsAPI.getPacks({...initialState, ...data})
    packsAPI.getPacks({...state, ...data})
        .then((res) => {
            dispatch(setCardPacks(res.data.cardPacks))
            dispatch(setCurrentPage(res.data.page))
            dispatch(setTotalCardPacksCount(res.data.cardPacksTotalCount))
            dispatch(setIsLoadingAC(false))

        })
}




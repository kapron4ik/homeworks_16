import {DispathActionType, PacksReqType, PacksType} from "../types/entities";
import {packsAPI} from "../api/api";
import {Dispatch} from "redux";
import {setCardPacks, setCurrentPage, setTotalCardPacksCount} from "./packs-reducer";


const initialState = {
    packName: '',
    min: 0,
    max: 40,
    sortPacks: 0,
    page: 1,
    pageCount: 40,
    user_id: ''
}

export const packsReqReducer = (state: PacksType = initialState, action: DispathActionType): PacksType => {
    switch (action.type) {
        case "packs-req/SET_DATA_PACKS":
            return  {...state, ...action.data}
        default:
            return state
    }
}

export const setDataPack = (data:PacksReqType) => {
    return{
        type: "packs-req/SET_DATA_PACKS",
        data
    } as const
}

//Thunk
export const getPacksReqTC = (data:PacksReqType) => (dispatch: Dispatch<DispathActionType>) => {
    debugger
    dispatch(setDataPack(data))
    packsAPI.getPacks({...initialState, ...data})
        .then((res) => {
            dispatch(setCardPacks(res.data.cardPacks))
            dispatch(setCurrentPage(res.data.page))
            dispatch(setTotalCardPacksCount(res.data.cardPacksTotalCount))
        })
}


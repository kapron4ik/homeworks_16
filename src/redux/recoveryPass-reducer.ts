import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {setErrorAC, setIsLoadingAC} from "./auth-reducer";
import {DispathActionType} from "../types/entities";

export type RequestErrorType = string | null
export type TokenType = string | undefined //????
export type StatusRequestType = 'succeeded' | 'failed' | null

const initialState = {
    email: '' as string,
    // error: null as RequestErrorType,
    statusRequest: null as StatusRequestType,
}

type InitialStateType = typeof initialState

export const recoveryPasReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'RECOVERY-PASS/SET-EMAIL':
            return {...state, email: action.email}
        case 'RECOVERY-PASS/SET-STATUS':
            return {...state, statusRequest: action.status}
        // case 'RECOVERY-PASS/SET-ERROR':
        //     return {...state, error: action.error}
        default:
            return state
    }
}

export const recoveryPasAC = (email: string) =>
    ({type: 'RECOVERY-PASS/SET-EMAIL', email} as const)
export const setStatusAC = (status: StatusRequestType) =>
    ({type: 'RECOVERY-PASS/SET-STATUS', status} as const)
// export const setErrorAC = (error: string) =>
//     ({type: 'RECOVERY-PASS/SET-ERROR', error} as const)

export const recoveryPasTC = (email: string) => (dispatch: Dispatch<DispathActionType>) => {
    dispatch(setIsLoadingAC(true))
    authAPI.recoveryPass(email)
        .then((res) => {
            dispatch(recoveryPasAC(email))
            dispatch(setStatusAC('succeeded'))
        })
        .catch((e) => {
            dispatch(setStatusAC('failed'))
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setIsLoadingAC(false)))
}

export const setNewPassTC = (password: string, resetPasswordToken: TokenType) => (dispatch: Dispatch<DispathActionType>) => {
    dispatch(setIsLoadingAC(true))
    authAPI.setNewPass(password, resetPasswordToken)
        .then((res) => {
            // @ts-ignore
            window.location = "#/login"
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setIsLoadingAC(false)))

}

type ActionsType = ReturnType<typeof recoveryPasAC> |
    ReturnType<typeof setStatusAC> |
    ReturnType<typeof setErrorAC>
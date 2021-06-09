import {useHistory} from "react-router-dom";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {PATH} from "../Routes";
import {DispathActionType, NewPackType} from "../types/entities";
import {AppStateType} from "./store";

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: new Date(),
    updated: new Date(),
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
    isLoggedIn: false,
    isLoading: false
}

export const authReducer = (state: AuthStateType = initialState, action: DispathActionType): AuthStateType => {

    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, ...action.payload}
        case 'login/ERROR':
            return {...state, error: action.error}
        case 'login/SET-IS-LOADING':
            return {...state, isLoading: action.value}
        default:
            return state
    }
}

export const setAuthUserDataAC = (payload: AuthStateType) =>
    ({type: 'login/SET-IS-LOGGED-IN', payload} as const)

export const setErrorAC = (error: string) =>
    ({type: 'login/ERROR', error} as const)

export const setIsLoadingAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOADING',
        value
    } as const
}

export const getAuthUserDataTC = () => (dispatch: Dispatch<DispathActionType>) => {
    dispatch(setIsLoadingAC(true))
    authAPI.me()
        .then((res) => {
            dispatch(setAuthUserDataAC(res.data))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
            // @ts-ignore
            window.location = "#/login"
        })
        .finally(() => dispatch(setIsLoadingAC(false)))
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<DispathActionType>) => {
    dispatch(setIsLoadingAC(true))
    authAPI.login(email, password, rememberMe)
        .then((res) => {
            dispatch(setAuthUserDataAC(res.data))
            dispatch(setErrorAC(''))
            // @ts-ignore
            window.location = "#/profile"
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setErrorAC(error))
        })
        .finally(() => dispatch(setIsLoadingAC(false)))

}
export const registerTC = (email: string, pasword: string) => (dispatch: Dispatch<DispathActionType>) => {
    dispatch(setIsLoadingAC(true))
    authAPI.register(email, pasword)
        .then((res) => {
            dispatch(setErrorAC(''))
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

export const logoutTC = () => (dispatch: Dispatch<DispathActionType>) => {
    dispatch(setIsLoadingAC(true))
    authAPI.logout()
        .then((res) => {
            dispatch(setAuthUserDataAC({
                _id: '',
                email: '',
                name: '',
                avatar: '',
                publicCardPacksCount: 0,
                created: new Date(),
                updated: new Date(),
                isAdmin: false,
                verified: false,
                rememberMe: false,
                error: '',
                isLoggedIn: false,
                isLoading: false
            }))
            dispatch(setErrorAC(''))
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

export const recoveryPasTC = (email: string) => {
    return (dispatch: Dispatch<DispathActionType>) => {
        dispatch(setIsLoadingAC(true))
        authAPI.recoveryPass(email)
            .then((res) => {
                console.log(res)
                // dispatch(recoveryPasAC(email))
                // dispatch(setStatusAC('succeeded'))
            })
            .catch((err) => {
                console.log(err)

                // dispatch(setStatusAC('failed'))

            })
        dispatch(setIsLoadingAC(false))
    }
}

//types
export type AuthStateType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error: string,
    isLoggedIn: boolean
    isLoading: boolean
}


import { useHistory } from "react-router-dom";
import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import { PATH } from "../Routes";
import {DispathActionType} from "../types/entities";

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
}

export const authReducer = (state: AuthStateType = initialState, action: DispathActionType): AuthStateType => {

    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, ...action.payload}
        case 'login/ERROR':
            return {...state, error:action.error}
        default:
            return state
    }
}

export const setAuthUserDataAC = (payload: AuthStateType) =>
    ({type: 'login/SET-IS-LOGGED-IN', payload} as const)

export const setErrorAC = (error: string) =>
    ({type: 'login/ERROR', error} as const)

export const getAuthUserDataTC = () => (dispatch: Dispatch<DispathActionType>) => {

    authAPI.me()
        .then((res) => {
            // console.log(res)
            let {
                _id, email, name, avatar,
                publicCardPacksCount, created,
                updated, isAdmin, verified,
                rememberMe, error
            } = res.data

            dispatch(setAuthUserDataAC({
                _id, email, name, avatar,
                publicCardPacksCount, created,
                updated, isAdmin, verified,
                rememberMe, error, isLoggedIn: true
            }))
        })
        .catch((res) => {
            // console.log(res)
        })
}

export const loginTC = (email: string, pasword: string, rememberMe: boolean) => (dispatch: (authUserData: (dispatch: Dispatch<DispathActionType>) => void) => void) => {
    // export const loginTC = (email: string, pasword: string, rememberMe: boolean) => (dispatch: Dispatch<DispathActionType>) => {
    authAPI.login(email, pasword, rememberMe)
        .then((res) => {
            dispatch(getAuthUserDataTC())
            // @ts-ignore
            window.location = "#/profile"

        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        })
}

export const registerTC = (email: string, pasword: string) => (dispatch: Dispatch<DispathActionType>) => {
    authAPI.register(email, pasword)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
        })
}

export const logoutTC = () => (dispatch: Dispatch<DispathActionType>) => {
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
                isLoggedIn: false
            }))
            // @ts-ignore
            window.location = "#/login"
        })
}

export const recoveryPasTC = (email: string) => {
    return (dispatch: Dispatch<DispathActionType>) => {
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
    error?: string,
    isLoggedIn: boolean
}


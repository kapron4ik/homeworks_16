import React, {useEffect, useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {recoveryPasTC, StatusRequestType} from "../../redux/recoveryPass-reducer";
import s from "./RecoveryPassword.module.css"
import {AppStateType} from "../../redux/store";
import Preloader from "../common/Preloader/Preloader";
import {isEmail} from "../Registration/Registration";
import {getAuthUserDataTC, setErrorAC} from "../../redux/auth-reducer";

const RecoveryPassword: React.FC<any> = (props) => {
    const [email, setEmail] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setErrorAC(''))
    }, [])
    const status = useSelector<AppStateType, StatusRequestType>((state) => state.recoveryPas.statusRequest)
    const error = useSelector<AppStateType, string>((state) => state.auth.error)
    const loading = useSelector<AppStateType, boolean>((state) => state.auth.isLoading)

    const onRecoveryPassHandler = () => {
        dispatch(recoveryPasTC(email))
    }

    const onChangeEmailHandler = (value: string) => {
        setEmail(value)
        setErrorEmail(isEmail(value))
    }

    return <div className={s.wrapper}>
        {loading
            ? <Preloader/>
            : <>
                <h1>Recovery password</h1>
                <SuperInputText
                    value={email}
                    onChangeText={onChangeEmailHandler}
                    placeholder='введите email'
                    error={errorEmail}
                />
                <SuperButton
                    onClick={onRecoveryPassHandler}
                    disabled={errorEmail ? true : false}
                >Восстановить</SuperButton>
                {error ? <div>{error}</div> : ''}
                {status === "succeeded" ?
                    <div>Дальнейшая инструкция по восстановлению выслана на указанную электронную почту</div> : ''}
            </>}
    </div>
}

export default RecoveryPassword
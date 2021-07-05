import React, {useState} from "react";
import {useParams} from "react-router-dom";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import {checkLenghtPass, correctConfPassword, correctPassword} from "../Registration/Registration";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {setNewPassTC} from "../../redux/recoveryPass-reducer";
import {AppStateType} from "../../redux/store";
import s from "./EnterNewPassword.module.css"
import Preloader from "../common/Preloader/Preloader";

const EnterNewPassword: React.FC<any> = (props) => {
    const {token} = useParams<{ token?: string }>()
    const [password, setPassword] = useState<string>('')
    const [confPassword, setConfPassword] = useState<string>('')
    const [errorPass, setErrorPass] = useState<string>('')
    const [errorConfPass, setErrorConfPass] = useState<string>('')
    const error = useSelector<AppStateType, string>((state) => state.auth.error)
    const loading = useSelector<AppStateType, boolean>((state) => state.auth.isLoading)

    const validation = [password !== '', confPassword !== '', errorPass === '', errorConfPass === '']
    const dispatch = useDispatch()

    const onChangePasswordHandler = (value: string) => {
        setPassword(value)
        setErrorPass(checkLenghtPass(value))
        setErrorConfPass(correctConfPassword(value, confPassword))
    }

    const onChangeConfPasswordHandler = (value: string) => {
        setConfPassword(value)
        setErrorConfPass(correctPassword(value, password))
    }

    const onNewPasswordHandler = () => {
        dispatch(setNewPassTC(password, token))
    }

    return <div className={s.wrapper}>
        {loading
            ? <Preloader/>
            : <>
                <h1>Enter new password</h1>
                <SuperInputText
                    value={password}
                    type={'password'}
                    onChangeText={onChangePasswordHandler}
                    placeholder='введите пароль 8 символов'
                    error={errorPass}
                />
                <SuperInputText
                    value={confPassword}
                    type={'password'}
                    onChangeText={onChangeConfPasswordHandler}
                    placeholder='подтвердите пароль'
                    error={errorConfPass}
                />
                <SuperButton onClick={onNewPasswordHandler}
                             disabled={validation.some(e => !e)}>Отправить</SuperButton>
                {error ? <div>{error}</div> : ''}
            </>}
    </div>
}

export default EnterNewPassword
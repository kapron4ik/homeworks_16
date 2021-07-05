import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import {loginTC, registerTC} from "../../redux/auth-reducer";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import s from "./Registration.module.css"
import {AppStateType} from "../../redux/store";
import Preloader from "../common/Preloader/Preloader";

export const checkLenghtPass = (value: string) => {
    if (value.length < 8) {
        // setErrorPass('пароль должен быть больше 8 символов')
        // return false
        return 'пароль должен быть больше 8 символов'
    } else {
        // setErrorPass('')
        // return true
        return ''
    }
}

export const correctPassword = (value: string, password: string) => {
    if (password !== value) {
        // setErrorConfPass('пароли не совпадают')
        // return false
        return 'пароли не совпадают'
    } else {
        // setErrorConfPass('')
        // return true
        return ''
    }
}

export const correctConfPassword = (value: string, confPassword: string) => {
    if (confPassword !== value) {
        // setErrorConfPass('пароли не совпадают')
        // return false
        return 'пароли не совпадают'
    } else {
        // setErrorConfPass('')
        // return true
        return ''
    }
}

export const isEmail = (val: string) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEmail.test(val)) {
        // setErrorEmail('')
        // return true
        return ''
    } else {
        // setErrorEmail('не корректный email')
        // return false
        return 'не корректный email'
    }
}

const Registration: React.FC<any> = (props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confPassword, setConfPassword] = useState<string>('')
    const [errorPass, setErrorPass] = useState<string>('')
    const [errorConfPass, setErrorConfPass] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const error = useSelector<AppStateType, string>((state) => state.auth.error)
    const loading = useSelector<AppStateType, boolean>((state) => state.auth.isLoading)

    const validation = [email !== '', password !== '', confPassword !== '', errorEmail === '', errorPass === '', errorConfPass === '']
    const dispatch = useDispatch()



    const onRegistrationHandler = () => {
        dispatch(registerTC(email, password))
    }

    const onChangeEmailHandler = (value: string) => {
        setEmail(value)
        setErrorEmail(isEmail(value))
    }

    const onChangePasswordHandler = (value: string) => {
        setPassword(value)
        // checkLenghtPass(value)
        setErrorPass(checkLenghtPass(value))
        // correctConfPassword(value)
        setErrorConfPass(correctConfPassword(value, confPassword))
    }

    const onChangeConfPasswordHandler = (value: string) => {
        setConfPassword(value)
        // correctPassword(value)
        setErrorConfPass(correctPassword(value, password))
    }

    return <div className={s.wrapper}>
        <h1>Registration</h1>
        {loading
            ? <Preloader/>
            : <>
                <SuperInputText
                    value={email}
                    onChangeText={onChangeEmailHandler}
                    placeholder='введите email'
                    error={errorEmail}
                />
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
                <SuperButton onClick={onRegistrationHandler}
                             disabled={validation.some(e => !e)}>Зарегестрироваться</SuperButton>
                {error ? <div>{error}</div> : ''}
            </>
        }
    </div>

}

export default Registration
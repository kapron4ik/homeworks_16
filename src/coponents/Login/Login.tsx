import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import s from "./Login.module.css"
import {getAuthUserDataTC, loginTC} from "../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import Preloader from "../common/Preloader/Preloader";

const Login: React.FC<any> = (props) => {
    const [login, setLogin] = useState<string>('kapron4ik@gmail.com')
    const [password, setPassword] = useState<string>('12345678')
    const [checked, setChecked] = useState<boolean>(false)
    const loading = useSelector<AppStateType, boolean>((state) => state.auth.isLoading)
    const error = useSelector<AppStateType, string>((state) => state.auth.error)

    const dispatch = useDispatch()

    const onLoginHandler = () => {
        dispatch(loginTC(login, password, checked))
    }

    return <div className={s.wrapper}>
        <h1>LOGIN</h1>
        {loading
            ? <Preloader/>
            : (<>
                <SuperInputText
                    value={login}
                    onChangeText={setLogin}
                />
                <SuperInputText
                    value={password}
                    type={'password'}
                    onChangeText={setPassword}
                />
                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}>Запомнить меня</SuperCheckbox>
                <SuperButton
                    onClick={onLoginHandler}>Войти</SuperButton>
                {error?<div>{error}</div>:''}
            </>)}
    </div>
}

export default Login
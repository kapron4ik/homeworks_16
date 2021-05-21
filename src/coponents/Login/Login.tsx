import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import s from "./Login.module.css"
import {getAuthUserDataTC, loginTC} from "../../redux/auth-reducer";
import {useDispatch} from "react-redux";

const Login: React.FC<any> = (props) => {
    // const [login, setLogin] = useState<string>('nya-admin@nya.nya')
    const [login, setLogin] = useState<string>('kapron4ik@gmail.com')
    // const [password, setPassword] = useState<string>('1qazxcvBG')
    const [password, setPassword] = useState<string>('12345678')
    const [checked, setChecked] = useState<boolean>(false)
    const dispatch = useDispatch()

    return <div className={s.wrapper}>
        <h1>LOGIN</h1>
        <SuperInputText
            value={login}
            onChangeText={setLogin}
        />
        <SuperInputText
            value={password}
            onChangeText={setPassword}
        />
        <SuperCheckbox
            checked={checked}
            onChangeChecked={setChecked}>Запомнить меня</SuperCheckbox>
        <SuperButton
            onClick={() => {
                dispatch(loginTC(login, password, checked))
            }
            }>Войти</SuperButton>
        <SuperButton
            onClick={() => {
                dispatch(getAuthUserDataTC())
            }
            }>Me</SuperButton>
    </div>
}

export default Login
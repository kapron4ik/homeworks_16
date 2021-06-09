import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import {useDispatch} from "react-redux";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import { recoveryPasTC } from "../../redux/recoveryPass-reducer";
import s from "./RecoveryPassword.module.css"

const RecoveryPassword: React.FC<any> = (props) => {
    const [email, setEmail] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const dispatch = useDispatch()

    const onRecoveryPassHandler = () => {
        dispatch(recoveryPasTC(email))
    }

    return <div className={s.wrapper}>
            <h1>Recovery password</h1>
            <SuperInputText
                value={email}
                onChangeText={setEmail}
                placeholder='введите email'
                error={errorEmail}
            />
        <SuperButton
            onClick={onRecoveryPassHandler}>Восстановить</SuperButton>
        {/*{error?<div>{error}</div>:''}*/}
        </div>
}

export default RecoveryPassword
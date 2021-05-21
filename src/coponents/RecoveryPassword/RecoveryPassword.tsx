import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import {useDispatch} from "react-redux";

const RecoveryPassword: React.FC<any> = (props) => {
    const [email, setEmail] = useState<string>('')
    const [errorEmail, setErrorEmail] = useState<string>('')
    const dispatch = useDispatch()

    return <div>
            <h1>Recovery password</h1>
            <SuperInputText
                value={email}
                onChangeText={setEmail}
                placeholder='введите email'
                error={errorEmail}
            />
        </div>
}

export default RecoveryPassword
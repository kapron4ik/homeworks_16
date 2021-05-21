import React from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import s from "./Test.module.css"

const Test: React.FC<any> = (props) => {
        return <div className={s.wrapper}>
            <h1>Test</h1>
            <SuperInputText/>
            <SuperCheckbox>Запомнить</SuperCheckbox>
            <SuperButton>Отправить</SuperButton>
        </div>
}

export default Test
import React, {useState} from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import s from "./Test.module.css"
import ModalContainer from "../Modals/ModalContainer";

const Test: React.FC<any> = (props) => {
    const [addPackName, setAddPackName] = useState('')
        return <div className={s.wrapper}>
            <h1>Test</h1>
            <SuperInputText/>
            <SuperCheckbox>Запомнить</SuperCheckbox>
            <SuperButton>Отправить</SuperButton>
            <ModalContainer name={'Добавить колоду'}>
                <h3>Добавить новую колоду</h3>
                <SuperInputText
                    value={addPackName}
                    onChangeText={setAddPackName}
                    placeholder={'название колоды'}/>
                <SuperButton
                onClick={()=>{alert(addPackName)}}>Добавить</SuperButton>
            </ModalContainer>
        </div>
}

export default Test
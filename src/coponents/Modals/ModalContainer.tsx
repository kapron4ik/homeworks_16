import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {CardsType} from "../../redux/cards-reducer";
import {CardReqType} from "../../types/entities";

type ModalContainerPropsType = {
    name: string
    disabled?: boolean
    setInput1?: (cardQuestion: string)=>void
    input1?: string
    setInput2?: (cardAnswer: string)=>void
    input2?: string

}

const ModalContainer: React.FC<ModalContainerPropsType> = (
    {
        name,
        disabled,
        children,
        setInput1,
        input1,
        setInput2,
        input2,
    }
) => {
    const [showModal, setShowModal] = useState(false)


    return <>
        <SuperButton disabled={disabled} onClick={() => setShowModal(true)}>{name}</SuperButton>
        {showModal &&
        <Modal
            showModal={setShowModal}
            input1 = {input1}
            setInput1 = {setInput1}
            input2 = {input2}
            setInput2 = {setInput2}>
            {children}
        </Modal>}
    </>
}

export default ModalContainer
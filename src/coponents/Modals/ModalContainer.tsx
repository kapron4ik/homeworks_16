import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import {CardsType} from "../../redux/cards-reducer";
import {CardReqType} from "../../types/entities";

type ModalContainerPropsType = {
    name: string
    disabled?: boolean
    setCardQuestion?: (cardQuestion: string)=>void
    cardQuestion?: string
    setCardAnswer?: (cardAnswer: string)=>void
    cardAnswer?: string

}

const ModalContainer: React.FC<ModalContainerPropsType> = (
    {
        name,
        disabled,
        children,
        setCardQuestion,
        cardQuestion,
        setCardAnswer,
        cardAnswer
    }
) => {
    const [showModal, setShowModal] = useState(false)


    return <>
        <SuperButton disabled={disabled} onClick={() => setShowModal(true)}>{name}</SuperButton>
        {showModal &&
        <Modal
            showModal={setShowModal}
            cardQuestion = {cardQuestion}
            setCardQuestion = {setCardQuestion}
            cardAnswer = {cardAnswer}
            setCardAnswer = {setCardAnswer}>
            {children}
        </Modal>}
    </>
}

export default ModalContainer
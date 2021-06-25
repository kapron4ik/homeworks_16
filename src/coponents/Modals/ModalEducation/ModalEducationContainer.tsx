import React, {SetStateAction, useEffect, useState} from "react";
import Modal from "./../Modal";
import {CardReqType, CardResType, DispathActionType} from "../../../types/entities";
import { Dispatch } from "react";
import { AppStateType } from "../../../redux/store";
import {useSelector} from "react-redux";
import {AuthStateType} from "../../../redux/auth-reducer";

type PropsType = {

    idPack: string
    // isClose: Dispatch<SetStateAction<boolean>>
    isClose: Dispatch<SetStateAction<string>>
    getCards: (data:CardReqType)=>void

    // cards: Array<CardResType>
}

const ModalEducationContainer: React.FC<PropsType> = (
    {

        idPack,
        isClose,
        getCards
        // cards
    }
) => {
    const [showModal, setShowModal] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    useEffect(() => {
        return getCards({cardsPack_id:idPack})
        // return props.getCards({page:props.currentPage, pageCount:props.pagesSize, cardsPack_id:'60a1d678f0aab80004e62a7d'})
    }, [])

    const cards = useSelector<AppStateType, Array<CardResType>>(state => state.cards.cards)
    console.log(cards)

    const showModalHandler = (value:boolean) => {
        return value?'':isClose('')
    }

    return <>
        <Modal
            showModal={showModalHandler}>
            {/*<h3>{"cards"}</h3>*/}
            <h3>{cards?cards[0].question:'Ваша колода пуста!'}</h3>
            {/*<h3>sdf - {cards[1].question}</h3>*/}
        </Modal>
    </>
}

export default ModalEducationContainer
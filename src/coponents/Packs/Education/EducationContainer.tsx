import {AppStateType} from "../../../redux/store";
import {connect, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {addCard, deleteCard, updateCard, setCurrentPageCards, CardsType} from "../../../redux/card-reducer";
import {useParams} from "react-router-dom";
import {getCardReqTC} from "../../../redux/card-request-reducer";
import ModalEducationContainer from "../../Modals/ModalEducation/ModalEducationContainer";
import Modal from "../../Modals/Modal";

type PropsType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    currentPage: number
    pagesSize: number
    getCards: (page: number, pageSize: number) => void,
    onPageChanged: (pageNumber: number) => void
    addCard: () => void
    deleteCard: (id: string) => void
    updateCard: (id: string) => void
}

const EducationContainer: React.FC<any> = (props) => {
    const {id} = useParams<{ id?: string }>()
    // useEffect(() => {
    //     return props.getCards({page:props.currentPage, pageCount:props.pagesSize, cardsPack_id:id})
    //     // return props.getCards({page:props.currentPage, pageCount:props.pagesSize, cardsPack_id:'60a1d678f0aab80004e62a7d'})
    // }, [])
    const [showModal, setShowModal] = useState(false)
    return <div>
        <h3>Education</h3>


    </div>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        cards: state.cards.cards,
        pagesSize: state.cards.pageCount,
        cardPacksTotalCount: state.cards.cardsTotalCount,
        currentPage: state.cards.page,

    }
}

export default connect(mapStateToProps, {
    setCurrentPage: setCurrentPageCards,
    getCards: getCardReqTC,
})(EducationContainer)


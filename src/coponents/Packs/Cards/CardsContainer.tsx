import {AppStateType} from "../../../redux/store";
import {connect, useSelector} from "react-redux";
import Cards from "./Cards";
import {useEffect} from "react";
import {addCard, deleteCard, updateCard, setCurrentPageCards, CardsType} from "../../../redux/card-reducer";
import {useParams} from "react-router-dom";
import {getCardReqTC} from "../../../redux/card-request-reducer";

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

const CardsContainer: React.FC<any> = (props) => {
    const {id} = useParams<{ id?: string }>()
    useEffect(() => {
        return props.getCards({page:props.currentPage, pageCount:props.pagesSize, cardsPack_id:id})
        // return props.getCards({page:props.currentPage, pageCount:props.pagesSize, cardsPack_id:'60a1d678f0aab80004e62a7d'})
    }, [])


    const onPageChanged = (pageNumber: number) => {
        props.getCards({page: pageNumber, pageCount: props.pagesSize, cardsPack_id:id})
    }

    const addCardHandler = () => {
        props.addCard(id)
    }

    const deleteCardHandler = (idCard: string) => {
        props.deleteCard(idCard, id)
    }

    const updateCardHandler = (idCard: string) => {
        props.updateCard(idCard, id)
    }


    return <div>
        <Cards
            cards={props.cards}
            cardsTotalCount={props.cardsTotalCount}
            currentPage={props.currentPage}
            pagesSize={props.pagesSize}
            onPageChanged={onPageChanged}
            addCard={addCardHandler}
            deleteCard={deleteCardHandler}
            updateCard={updateCardHandler}
        />
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
    addCard: addCard,
    deleteCard: deleteCard,
    updateCard: updateCard
})(CardsContainer)


import {AppStateType} from "../../../redux/store";
import {connect, useSelector} from "react-redux";
import Cards from "./Cards";
import {useEffect} from "react";
import {addCard, deleteCard, updateCard, setCurrentPageCards, CardsType} from "../../../redux/cards-reducer";
import {useParams} from "react-router-dom";
import {getCardsReqTC} from "../../../redux/cards-request-reducer";
import {CardReqType} from "../../../types/entities";
import {setIsLoadingAC} from "../../../redux/auth-reducer";

type PropsType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    currentPage: number
    pagesSize: number
    getCards: (page: number, pageSize: number) => void,
    onPageChanged: (pageNumber: number) => void
    addCard: (data:CardReqType) => void
    deleteCard: (id: string) => void
    updateCard: (id: string) => void
}

const CardsContainer: React.FC<any> = (props) => {
    const {id} = useParams<{ id?: string }>()
    useEffect(() => {
        return props.getCards({cardsPack_id:id, page:props.currentPage, pageCount:props.pagesSize})
    }, [])

    const onPageChanged = (pageNumber: number) => {
        props.getCards({page: pageNumber, pageCount: props.pagesSize, cardsPack_id:id})
    }

    const addCardHandler = (data:CardReqType) => {
        props.addCard({cardsPack_id:id, ...data})
    }

    const deleteCardHandler = (idCard: string) => {
        props.deleteCard(idCard, id)
    }

    const updateCardHandler = (data:CardReqType) => {
        props.updateCard({...data})
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
            loading={props.loading}
        />
    </div>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        cards: state.cards.cards,
        pagesSize: state.cards.pageCount,
        cardsTotalCount: state.cards.cardsTotalCount,
        currentPage: state.cards.page,
        loading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {
    setCurrentPage: setCurrentPageCards,
    getCards: getCardsReqTC,
    addCard: addCard,
    deleteCard: deleteCard,
    updateCard: updateCard
})(CardsContainer)


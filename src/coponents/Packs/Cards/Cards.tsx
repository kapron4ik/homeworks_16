import React, {useState} from "react";
import {CardsType} from "../../../redux/cards-reducer";
import s from "./Cards.module.css"
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import ModalContainer from "../../Modals/ModalContainer";
import {CardReqType} from "../../../types/entities";
import Preloader from "../../common/Preloader/Preloader";
import Pagination from "@material-ui/lab/Pagination";


export type CardsPropsType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    currentPage: number
    pagesSize: number
    onPageChanged: (pageNumber: number) => void
    addCard: (data: CardReqType) => void
    deleteCard: (id: string) => void
    updateCard: (data: CardReqType) => void
    loading: boolean
}

export const Cards = (props: CardsPropsType) => {
    const [cardQuestion, setCardQuestion] = useState('')
    const [cardAnswer, setCardAnswer] = useState('')
    let pageCount = Math.ceil(props.cardsTotalCount / props.pagesSize)
    let arrayPageCount: Array<number> = []
    for (let i = 1; i <= pageCount; i++) {
        arrayPageCount.push(i)
    }

    const addCardHandler = () => {
        props.addCard({
            answer: cardAnswer,
            question: cardQuestion
        })
        setCardQuestion('')
        setCardAnswer('')
    }

    const updateCardHandler = (id: string) => {
        props.updateCard({
            _id: id, answer: cardAnswer,
            question: cardQuestion
        })
        setCardQuestion('')
        setCardAnswer('')
    }


    const handleChange = (event: React.FormEvent<EventTarget>, value: number) => {
        props.onPageChanged(value)
    };


    return <div>
        <div>
            {/*{arrayPageCount.map(p => {*/}
            {/*    return <span className={props.currentPage === p ? s.selectedPage : ''}*/}
            {/*                 onClick={() => props.onPageChanged(p)}>{p}</span>*/}
            {/*})}*/}
            <Pagination count={pageCount} page={props.currentPage} onChange={handleChange} variant="outlined"
                        color="primary"/>
        </div>
        {props.loading
            ? <Preloader/>
            : <table>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Grade</th>
                    <th>Update</th>
                    <th>URL</th>
                    <th>
                        <ModalContainer name={'Добавить карту'}>
                            <h3>Добавить новую карту</h3>
                            <SuperInputText
                                value={cardQuestion}
                                onChangeText={setCardQuestion}
                                placeholder={'напишите вопрос'}/>
                            <SuperInputText
                                value={cardAnswer}
                                onChangeText={setCardAnswer}
                                placeholder={'напишите вопрос'}/>
                            <SuperButton
                                onClick={addCardHandler}>Добавить</SuperButton>
                        </ModalContainer>
                    </th>
                </tr>
                {
                    props.cards.map(c => <tr key={c._id}>
                        <th>{c.question}</th>
                        <th>{c.answer}</th>
                        <th>{c.grade}</th>
                        <th>{c.updated}</th>
                        <th></th>
                        <th>

                            <ModalContainer name={'Delete'}>
                                <h3>Вы действительно хотите удалить карту?</h3>
                                <SuperButton
                                    onClick={() => c._id && props.deleteCard(c._id)}>Применить</SuperButton>
                            </ModalContainer>
                            <ModalContainer name={'Update'}
                                            input1 = {c.question}
                                            setInput1 = {setCardQuestion}
                                            input2 = {c.answer}
                                            setInput2 = {setCardAnswer}>
                                <h3>Изменить карту</h3>
                                <SuperInputText
                                    value={cardQuestion}
                                    onChangeText={setCardQuestion}/>
                                <SuperInputText
                                    value={cardAnswer}
                                    onChangeText={setCardAnswer}/>
                                <SuperButton
                                    onClick={() => updateCardHandler(c._id)}>Применить</SuperButton>
                            </ModalContainer>
                            {/*<button onClick={() => {*/}
                            {/*    props.updateCard(c._id)*/}
                            {/*}}>update*/}
                            {/*</button>*/}
                        </th>
                    </tr>)
                }
            </table>
        }
    </div>
}

export default Cards
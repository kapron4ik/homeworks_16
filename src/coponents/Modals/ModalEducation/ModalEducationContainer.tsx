import React, {SetStateAction, useEffect, useState} from "react";
import Modal from "./../Modal";
import {CardResType, CardsReqType} from "../../../types/entities";
import {Dispatch} from "react";
import {AppStateType} from "../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {CardsType, updateGrade} from "../../../redux/cards-reducer";
import SuperButton from "../../common/c2-SuperButton/SuperButton";

//IsLoading при подключении сбрасывает модалки, но если в модалке UseEffect постоянно его перезапускает
//Сбрасівается сортировка колод по количеству карт при заходе в колоду и віходе обратно
//Не показівает 5 карту в колоде

type PropsType = {

    idPack: string
    // isClose: Dispatch<SetStateAction<boolean>>
    isClose: Dispatch<SetStateAction<string>>
    getCards: (data: CardsReqType) => void

    // cards: Array<CardResType>
}

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: Array<CardResType>) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const ModalEducationContainer: React.FC<PropsType> = (
    {
        idPack,
        isClose,
        getCards
        // cards
    }
) => {
    debugger
    const dispatch = useDispatch();
    // const [showModal, setShowModal] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [first, setFirst] = useState<boolean>(true);
    console.log(`idPack - ${idPack}`)

    const cards = useSelector<AppStateType, Array<CardsType>>(state => state.cards.cards)
    console.log(cards)

    const [card, setCard] = useState<CardResType>({
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        rating: 0,
        shots: 0,
        type: '',
        user_id: '',
        created: '',
        updated: '',
        __v: 0,
        _id: '',
    })
    console.log(`card - ${card}`)

    useEffect(() => {
        // getCards({cardsPack_id: idPack})
        if (first) {
            getCards({cardsPack_id: idPack})
            setFirst(false)
        }
        if (cards.length > 0) {setCard(getCard(cards))}
    }, [idPack, cards, first])

    const showModalHandler = (value: boolean) => {
        return value ? '' : isClose('')
    }

    const onNext = () => {
        setCard(getCard(cards));
        setShowAnswer(false)
    }

    const setGrade = (grade: number) => {
        dispatch(updateGrade(grade, card._id))
        setCard({
            answer: '',
            question: '',
            cardsPack_id: '',
            grade: 0,
            rating: 0,
            shots: 0,
            type: '',
            user_id: '',
            created: '',
            updated: '',
            __v: 0,
            _id: '',
        })
        setShowAnswer (false)
    }

    return <>
        <Modal showModal={showModalHandler}>
            <h3>{card.question}</h3>
            {showAnswer
                ? <>
                    <p style={{color: "#505050", fontStyle: "italic", fontWeight:"lighter"}}>{card.answer}</p>
                    <div style={{display: "flex", marginBottom:"25px"}}>
                        {grades.map((g, i) => (
                            <SuperButton key={'grade-' + i}
                                         style={{fontSize:"18px"}}
                                         onClick={() => setGrade(i+1)}>{g}</SuperButton>
                        ))}
                    </div>
                    <SuperButton
                        // style={{marginLeft:"100%", transform: "translate(-50%)"}}
                        onClick={() => onNext()}>Дальше</SuperButton>
                </>
                : <SuperButton
                    onClick={() => setShowAnswer(true)}>Показать ответ</SuperButton>
            }
        </Modal>
    </>
}

export default ModalEducationContainer
import React from "react";
import { CardsType } from "../../../redux/card-reducer";
import s from "./Cards.module.css"


export type CardsPropsType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    currentPage: number
    pagesSize: number
    onPageChanged: (pageNumber: number) => void
    addCard: () => void
    deleteCard: (id: string) => void
    updateCard: (id: string) => void
}

export const Cards = (props: CardsPropsType) => {

    let pageCount = Math.ceil(props.cardsTotalCount / props.pagesSize)
    let arrayPageCount: Array<number> = []
    for (let i = 1; i <= pageCount; i++) {
        arrayPageCount.push(i)
    }

    return <div>
        <div>
            {arrayPageCount.map(p => {
                return <span className={props.currentPage === p ? s.selectedPage : ''}
                             onClick={() => props.onPageChanged(p)}>{p}</span>
            })}
        </div>
        <table>
            <tr>
                <th>Question</th>
                <th>Answer</th>
                <th>Grade</th>
                <th>Update</th>
                <th>URL</th>
                <th>
                    <button onClick={() => {props.addCard()
                    }}>add
                    </button>
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
                        <button onClick={() => {
                            props.deleteCard(c._id)
                        }}>del
                        </button>
                        <button onClick={() => {
                            props.updateCard(c._id)
                        }}>update
                        </button>
                    </th>
                </tr>)
            }
        </table>
    </div>
}

export default Cards